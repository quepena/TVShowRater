import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast, CastTvShow, TvShow } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCastDto, CreateCastTvShowDto } from './cast.dto';

@Injectable()
export class CastService {
    constructor(
        @InjectRepository(Cast) private readonly castRepository: Repository<Cast>,
        @InjectRepository(CastTvShow) private readonly castTvShowRepository: Repository<CastTvShow>,
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
    ) { }

    async createCast(castDetails: CreateCastDto): Promise<Cast> {
        const { name, biography, photo, tvShows } = castDetails;
        const newCast = this.castRepository.create(createCastDto);
        return await this.castRepository.save(newCast);
    }

    async findCast() {
        return await this.castRepository.find({
            relations: {
                tvShows: true,
            }});
    }

    async findCastById(id: number) {
        return await this.castRepository.findOne({
            where: { id: id },
            relations: {
                tvShows: true,
            }
        });
    }

    async updateCast(id: number, createCastDto: CreateCastDto) {
        await this.castRepository.update(id, createCastDto);
        const updatedCast = await this.castRepository.findOneBy({id: id});
        if (updatedCast) {
            return updatedCast;
        }
    }

    async deleteCast(id: number) {
        return await this.castRepository.delete(id);
    }

    async findCastByTvShow(id: number) {
        return await this.castRepository.find({
            where: { id: id },
            relations: {
                tvShows: true,
            }
        })
    }

    async createCharacter(castTvShowDetails: CreateCastTvShowDto): Promise<CastTvShow> {
        const { tvShowId, castId, character } = castTvShowDetails;
        const newCharacter = new CastTvShow();
        newCharacter.tvShowId = await this.tvShowRepository.findOne({ where: { id: tvShowId } })
        newCharacter.castId = await this.castRepository.findOne({ where: { id: castId } })
        newCharacter.character = character;

        return await this.castTvShowRepository.save(newCharacter);
    }
}
