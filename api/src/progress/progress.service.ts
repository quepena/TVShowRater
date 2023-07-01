import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Episode } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateProgressDto } from './progress.dto';
import { Progress } from './progress.entity';

@Injectable()
export class ProgressService {
    constructor(
        @InjectRepository(Progress) private readonly progressRepository: Repository<Progress>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Episode) private readonly episodeRepository: Repository<Episode>,
    ) { }

    async createProgress(progressDetails: CreateProgressDto): Promise<Progress> {
        const { user, episode } = progressDetails;
        const progress = new Progress();
        progress.user = await this.userRepository.findOne({ where: { id: user } })
        progress.episode = await this.episodeRepository.findOne({ where: { id: episode } })

        return await this.progressRepository.save(progress);
    }

    async findProgress() {
        return await this.progressRepository.find({
            relations: {
                user: true,
                episode: true,
            }
        });
    }

    async findProgressById(id: number) {
        return await this.progressRepository.findOne({
            where: { id: id },
            relations: {
                user: true,
                episode: true,
            }
        })
    }

    async deleteProgress(id: number) {
        return await this.progressRepository.delete(id);
    }

    async updateProgress(id: number, progressDetails: CreateProgressDto): Promise<Progress> {
        const { user, episode } = progressDetails;
        const progress = new Progress();
        progress.user = await this.userRepository.findOne({ where: { id: user } })
        progress.episode = await this.episodeRepository.findOne({ where: { id: episode } })

        const newProgress = await this.progressRepository.save(
            { id: Number(id), user: progress.user, episode: progress.episode }
        )

        return newProgress
    }

    async findProgressByUser(id: number) {
        return await this.progressRepository.find({
            where: { user: { id: id } },
            relations: {
                user: true,
                episode: true,
            }
        })
    }

    async findProgressByUserByShow(user: number, show: number) {
        return await this.progressRepository.find({
            where: { user: { id: user }, episode: { season: { tvShow: { id: show } } } },
            relations: ['user', 'episode', 'episode.season', 'episode.season.tvShow']
        })
    }
}
