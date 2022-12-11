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
        for (let i = 0; i < episodes.length; i++) {
            const episode = await this.episodeRepository.findOne({
                where: { id: episodes[i] }
            });
            season.episodes.push(episode);
        }

        return await this.seasonRepository.save(season);
    }

    findSeason() {
        return this.seasonRepository.find();
    }
}
