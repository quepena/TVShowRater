import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre, Season } from 'src/entities';
import { TvShow } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateTvShowDto } from './tv-show.dto';

@Injectable()
export class TvShowService {
    constructor(
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
        @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
        @InjectRepository(Season) private readonly seasonRepository: Repository<Season>,
    ) { }

    async createTvShow(tvShowDetails: CreateTvShowDto): Promise<TvShow> {
        const { name, photo, description, length, genres, trailer, country } = tvShowDetails;
        const tvShow = new TvShow();
        tvShow.name = name;
        tvShow.photo = photo;
        tvShow.description = description;
        tvShow.length = length;
        tvShow.trailer = trailer;
        tvShow.country = country;
        tvShow.genres = [];
        for (let i = 0; i < genres.length; i++) {
            const genre = await this.genreRepository.findOne({
                where: { id: genres[i] }
            });
            tvShow.genres.push(genre);
        }

        return await this.tvShowRepository.save(tvShow);
    }

    async findTvShows() {
        return await this.tvShowRepository.find({
            relations: {
                genres: true
            }
        });
    }

    async findTVShowById(id: number) {
        return this.tvShowRepository.findOneBy({ id: id })
    }

    async deleteTVShow(id: number) {
        return await this.tvShowRepository.delete(id);
    }

    async updateTvShow(id: number, tvShowDetails: CreateTvShowDto): Promise<TvShow> {
        const { name, photo, description, length, genres, trailer, country, seasons } = tvShowDetails;
        const tvShow = new TvShow();
        tvShow.name = name;
        tvShow.photo = photo;
        tvShow.description = description;
        tvShow.length = length;
        tvShow.trailer = trailer;
        tvShow.country = country;
        tvShow.genres = [];
        for (let i = 0; i < genres.length; i++) {
            const genre = await this.genreRepository.findOne({
                where: { id: genres[i] }
            });
            tvShow.genres.push(genre);
        }

        tvShow.seasons = [];
        for (let i = 0; i < seasons.length; i++) {
            const season = await this.seasonRepository.findOne({
                where: { id: seasons[i] }
            });
            tvShow.seasons.push(season);
        }

        const newShow = await this.tvShowRepository.save(
            { id: Number(id), name: tvShow.name, photo: tvShow.description, description: tvShow.description, length: tvShow.length, trailer: tvShow.trailer, country: tvShow.trailer, genres: tvShow.genres, seasons: tvShow.seasons }
        )

        return newShow
    }

    async findTVShowsByGenre(id: number) {
        return await this.tvShowRepository.find({ where: { genres: { id: id } } })
    }
}
