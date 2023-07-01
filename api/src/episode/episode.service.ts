import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Season } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateEpisodeDto } from './episode.dto';
import { Episode } from './episode.entity';

@Injectable()
export class EpisodeService {
    constructor(
        @InjectRepository(Episode) private readonly episodeRepository: Repository<Episode>,
        @InjectRepository(Season) private readonly seasonRepository: Repository<Season>,
    ) { }

    async createEpisode(episodeDetails: CreateEpisodeDto): Promise<Episode> {
        const { name, season, numEp } = episodeDetails;
        const episode = new Episode();
        episode.name = name;
        episode.numEp = numEp;
        episode.season = await this.seasonRepository.findOne({ where: { id: season } })

        return await this.episodeRepository.save(episode);
    }

    async findEpisode() {
        return await this.episodeRepository.find({
            relations: ['season', 'season.tvShow']
        });
    }

    async findEpisodeById(id: number) {
        return await this.episodeRepository.findOne({ where: { id: id }, relations: ['season', 'season.tvShow'] })
    }

    async deleteEpisode(id: number) {
        return await this.episodeRepository.delete(id);
    }

    async updateEpisode(id: number, episodeDetails: CreateEpisodeDto): Promise<Episode> {
        const { name, season, numEp } = episodeDetails;
        const episode = new Episode();
        episode.name = name;
        episode.numEp = numEp;
        episode.season = await this.seasonRepository.findOne({ where: { id: season } });

        const newEpisode = await this.episodeRepository.save(
            { id: Number(id), name: episode.name, season: episode.season, tvShow: episode.season.tvShow, numSeason: episode.season.numSeason, episodes: episode.season.episodes }
        )

        return newEpisode
    }

    async findEpisodesBySeasons(id: number) {
        return await this.episodeRepository.find({ where: { season: { id: id } }, relations: ['season', 'season.tvShow'], order: { numEp: 'ASC' } })
    }

    async countAllEpisodes(id: number) {
        return await this.episodeRepository.findAndCount({ where: { season: { tvShow: { id: id } } }, relations: ['season', 'season.tvShow'], order: { numEp: 'ASC' } })
    }
}
