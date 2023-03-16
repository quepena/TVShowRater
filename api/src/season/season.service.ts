import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TvShow, Episode } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateSeasonDto } from './season.dto';
import { Season } from './season.entity';

@Injectable()
export class SeasonService {
    constructor(
        @InjectRepository(Season) private readonly seasonRepository: Repository<Season>,
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
        @InjectRepository(Episode) private readonly episodeRepository: Repository<Episode>,
    ) { }

    async createSeason(seasonDetails: CreateSeasonDto): Promise<Season> {
        const { tvShow, numSeason, episodes } = seasonDetails;
        const season = new Season();
        season.numSeason = numSeason;
        season.tvShow = await this.tvShowRepository.findOne({ where: { id: tvShow } })
        season.episodes = []
        if (episodes) {
            for (let i = 0; i < episodes.length; i++) {
                const episode = await this.episodeRepository.findOne({
                    where: { id: episodes[i] }
                });
                season.episodes.push(episode);
            }
        }

        return await this.seasonRepository.save(season);
    }

    async findSeasons() {
        return await this.seasonRepository.find({
            relations: {
                tvShow: true
            }
        });
    }

    async findSeasonById(id: number) {
        return await this.seasonRepository.findOneBy({ id: id })
    }

    async deleteSeason(id: number) {
        return await this.seasonRepository.delete(id);
    }

    async updateSeason(id: number, seasonDetails: CreateSeasonDto): Promise<Season> {
        const { numSeason, tvShow, episodes } = seasonDetails;
        const season = new Season();
        season.numSeason = numSeason;
        season.tvShow = await this.tvShowRepository.findOne({ where: { id: tvShow } });
        season.episodes = [];
        if (episodes) {
            for (let i = 0; i < episodes.length; i++) {
                const episode = await this.episodeRepository.findOne({
                    where: { id: episodes[i] }
                });
                season.episodes.push(episode);
            }
        }

        const newSeason = await this.seasonRepository.save(
            { id: Number(id), numSeason: season.numSeason, tvShow: season.tvShow, episodes: season.episodes }
        )

        return newSeason
    }

    async findSeasonsByTVShows(id: number) {
        return await this.seasonRepository.findBy({ tvShow: { id: id } })
    }
}
