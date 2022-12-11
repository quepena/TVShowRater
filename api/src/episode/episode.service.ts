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
        const { name, season } = episodeDetails;
        const episode = new Episode();
        episode.name = name;
        episode.season = await this.seasonRepository.findOne({ where: { id: season } })

        return await this.episodeRepository.save(episode);
    }

    findEpisode() {
        return this.episodeRepository.find();
    }
}
