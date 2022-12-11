import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from 'src/entities';
import { TvShow } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateTvShowDto } from './tv-show.dto';

@Injectable()
export class TvShowService {
    constructor(
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
        @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
    ) { }

    async createTvShow(tvShowDetails: CreateTvShowDto): Promise<TvShow> {
        const { name, photo, description, length, genres, trailer, country } = tvShowDetails;
        const tvShow = new TvShow();
        tvShow.name = name;
        tvShow.photo = photo;
        tvShow.description = description;
        tvShow.length = length;
        tvShow.trailer= trailer;
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

    findTvShows() {
        return this.tvShowRepository.find();
    }
}
