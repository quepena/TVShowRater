import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre, Season, Cast } from 'src/entities';
import { TvShow } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateTvShowDto } from './tv-show.dto';

@Injectable()
export class TvShowService {
    constructor(
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
        @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
        @InjectRepository(Cast) private readonly castRepository: Repository<Cast>,
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
            }
        })
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
        const { name, photo, description, length, genres, trailer, country, addId, year } = tvShowDetails;
        const tvShow = new TvShow();
        tvShow.name = name;
        tvShow.photo = photo;
        tvShow.description = description;
        tvShow.length = length;
        tvShow.trailer = trailer;
        tvShow.country = country;
        tvShow.genres = [];
        tvShow.addId = addId;
        tvShow.year = year;
        for (let i = 0; i < genres.length; i++) {
            const genre = await this.genreRepository.findOne({
                where: { id: genres[i] }
            });
            tvShow.genres.push(genre);
        }

        const newShow = await this.tvShowRepository.save(
            { id: Number(id), name: tvShow.name, photo: tvShow.photo, description: tvShow.description, length: tvShow.length, trailer: tvShow.trailer, country: tvShow.trailer, genres: tvShow.genres, addId: tvShow.addId, year: tvShow.year }
        )

        return newShow
    }

    async findTVShowsByGenre(id: number) {
        return await this.tvShowRepository.find({ where: { genres: { id: id } } })
    }

    async search(name: string) {
        const show = await this.tvShowRepository.createQueryBuilder("tvshow")
            .select()
            .where("LOWER(REPLACE(tvshow.name, ' ', '')) like LOWER(REPLACE(:name, ' ', ''))", { name: `%${name}%` })
            .take(6)
            .getMany()

        const castSearch = await this.castRepository.createQueryBuilder("cast")
            .select()
            .where("LOWER(REPLACE(cast.name, ' ', '')) like LOWER(REPLACE(:name, ' ', ''))", { name: `%${name}%` })
            .take(6)
            .getMany()

        return [...show, ...castSearch]
    }

    async searchShows(name: string) {
        const show = await this.tvShowRepository.createQueryBuilder("tvshow")
            .select()
            .where("LOWER(REPLACE(tvshow.name, ' ', '')) like LOWER(REPLACE(:name, ' ', ''))", { name: `%${name}%` })
            .take(6)
            .getMany()

        return show
    }
}
