import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre, Season, Cast, Crew } from 'src/entities';
import { TvShow } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateTvShowDto } from './tv-show.dto';

@Injectable()
export class TvShowService {
    constructor(
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
        @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
        @InjectRepository(Season) private readonly seasonRepository: Repository<Season>,
        @InjectRepository(Cast) private readonly castRepository: Repository<Cast>,
        // @InjectRepository(Crew) private readonly crewRepository: Repository<Crew>,
    ) { }

    async createTvShow(tvShowDetails: CreateTvShowDto): Promise<TvShow> {
        const { name, photo, description, length, genres, trailer, country, year, addId } = tvShowDetails;
        const tvShow = new TvShow();
        tvShow.name = name;
        tvShow.photo = photo;
        tvShow.description = description;
        tvShow.length = length;
        tvShow.trailer = trailer;
        tvShow.country = country;
        tvShow.genres = [];
        tvShow.year = year;
        tvShow.addId = addId;
        for (let i = 0; i < genres.length; i++) {
            const genre = await this.genreRepository.findOne({
                where: { id: genres[i] }
            });
            
            tvShow.genres.push(genre);
        }

        return await this.tvShowRepository.save(tvShow);
    }

    async findTvShows() {
        return await this.tvShowRepository.findAndCount({
            relations: {
                genres: true
            }
        });
    }

    async findTVShowById(id: number) {
        return this.tvShowRepository.findOne({
            where: { id: id }, relations: {
            genres: true
        }})
    }

    async findTVShowByAddId(addId: string) {
        return await this.tvShowRepository.findOne({
            where: { addId: addId },
            relations: {
                genres: true
            }
        });
    }

    async findShowByName(name: string) {
    return this.tvShowRepository.findOneBy({ name: name })
  }

    async deleteTVShow(id: number) {
        return await this.tvShowRepository.delete(id);
    }

    async updateTvShow(id: number, tvShowDetails: CreateTvShowDto): Promise<TvShow> {
        const { name, photo, description, length, genres, trailer, country, addId } = tvShowDetails;
        const tvShow = new TvShow();
        tvShow.name = name;
        tvShow.photo = photo;
        tvShow.description = description;
        tvShow.length = length;
        tvShow.trailer = trailer;
        tvShow.country = country;
        tvShow.genres = [];
        tvShow.addId = addId;
        for (let i = 0; i < genres.length; i++) {
            const genre = await this.genreRepository.findOne({
                where: { id: genres[i] }
            });
            tvShow.genres.push(genre);
        }

        // tvShow.seasons = [];
        // for (let i = 0; i < seasons.length; i++) {
        //     const season = await this.seasonRepository.findOne({
        //         where: { id: seasons[i] }
        //     });
        //     tvShow.seasons.push(season);
        // }

        const newShow = await this.tvShowRepository.save(
            { id: Number(id), name: tvShow.name, photo: tvShow.description, description: tvShow.description, length: tvShow.length, trailer: tvShow.trailer, country: tvShow.trailer, genres: tvShow.genres, addId: tvShow.addId }
        )

        return newShow
    }

    async findTVShowsByGenre(id: number) {
        return await this.tvShowRepository.find({ where: { genres: { id: id } } })
    }

    async search(name: string, cast: string) {
        // console.log(country.split('-'), typeof country);
        // let countryArr = country.split('-');
        // console.log(typeof countryArr);
        
        // // let countries: string[] = []
        // // countryArr.forEach((country) => countries.push(country))
        // // console.log(name, countries);
        // if (countryArr.length === 0) {
            const show = await this.tvShowRepository.createQueryBuilder("tvshow")
                .select()
                .where("LOWER(REPLACE(tvshow.name, ' ', '')) like LOWER(REPLACE(:name, ' ', ''))", { name: `%${name}%` })
                .getMany()

            const castSearch = await this.castRepository.createQueryBuilder("cast")
                .select()
                .where("LOWER(REPLACE(cast.name, ' ', '')) like LOWER(REPLACE(:name, ' ', ''))", { name: `%${name}%` })
                .getMany()

            // const crew = await this.crewRepository.createQueryBuilder("crew")
            //     .select()
            //     .where("LOWER(REPLACE(crew.name, ' ', '')) like LOWER(REPLACE(:name, ' ', ''))", { name: `%${name}%` })
            //     .getMany()

            if (show) 
            return show
            else if(cast)
            return castSearch
        //     else if (cast.length > 0) return cast
        //     // else if (crew.length > 0) return crew
        //     // else if (cast.length > 0 && crew.length > 0) return cast
        // } else {
        //     //LOWER(REPLACE(tvshow.name, ' ', '')) like LOWER(REPLACE(:name, ' ', '')) and 
        //     const countryQuery = await this.tvShowRepository.createQueryBuilder("tvshow")
        //         .select()
        //         .where("LOWER(tvshow.country) like LOWER(:country)", { country: `%${name}%` })
        //         .getMany()

        //     const genre = await this.genreRepository.createQueryBuilder("genre")
        //         .select()
        //         .where("LOWER(REPLACE(crew.name, ' ', '')) like LOWER(REPLACE(:name, ' ', '')) and tvshow.country like :country", { name: `%${name}%` })
        //         .getMany()

        //     return countryQuery
        // }
    }
}
