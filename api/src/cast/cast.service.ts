import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast, CastTvShow, TvShow, Role } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCastDto, CreateCastTvShowDto } from './cast.dto';

@Injectable()
export class CastService {
    constructor(
        @InjectRepository(Cast) private readonly castRepository: Repository<Cast>,
        @InjectRepository(CastTvShow) private readonly castTvShowRepository: Repository<CastTvShow>,
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    async createCast(castDetails: CreateCastDto): Promise<Cast> {
        const { name, biography, photo, tvShows } = castDetails;
        const cast = new Cast();
        cast.name = name;
        cast.biography = biography;
        cast.photo = photo;

        return await this.castRepository.save(cast);
    }

    async findCast() {
        return await this.castRepository.find({
            relations: ['castTvShow', 'castTvShow.tvShow']
        });
    }

    async findCastById(id: number) {
        return await this.castRepository.findOne({
            where: { id: id },
            relations: ['castTvShow', 'castTvShow.tvShow']
        });
    }

    async updateCast(id: number, castDetails: CreateCastDto): Promise<Cast> {
        const { name, biography, photo } = castDetails;
        const cast = new Cast();
        cast.name = name;
        cast.biography = biography;
        cast.photo = photo;

        const updatedCast = await this.castRepository.save({ id: Number(id), name: cast.name, biography: cast.biography, photo: cast.photo });

        return updatedCast;
    }

    async deleteCast(id: number) {
        return await this.castRepository.delete(id);
    }

    async findCastByTvShow(id: number) {
        return await this.castTvShowRepository.find({
            where: { tvShow: { id: id } },
            relations: ['tvShow']
        })
    }

    async createCharacter(castTvShowDetails: CreateCastTvShowDto): Promise<CastTvShow> {
        const { tvShow, cast, character } = castTvShowDetails;
        const newCharacter = new CastTvShow();
        newCharacter.tvShow = await this.tvShowRepository.findOne({ where: { id: tvShow } })
        newCharacter.cast = await this.castRepository.findOne({ where: { id: cast } })
        newCharacter.character = character;  

        return await this.castTvShowRepository.save(newCharacter);
    }

    async findCharacters() {
        return await this.castTvShowRepository.find({
            relations: {
                tvShow: true,
                cast: true
            }
        });
    }

    async findCharacterById(id: number) {
        return await this.castTvShowRepository.findOne({
            where: { id: id },
            relations: {
                tvShow: true,
                cast: true
            }
        });
    }

    async updateCharacter(id: number, castTvShowDetails: CreateCastTvShowDto): Promise<CastTvShow> {
        const { tvShow, cast, character } = castTvShowDetails;
        const newCharacter = new CastTvShow();
        newCharacter.tvShow = await this.tvShowRepository.findOne({ where: { id: tvShow } })
        newCharacter.cast = await this.castRepository.findOne({ where: { id: cast } })
        newCharacter.character = character;

        const updatedCastTvShow = await this.castTvShowRepository.save({ id: Number(id), tvShow: newCharacter.tvShow, cast: newCharacter.cast, character: newCharacter.character });

        return updatedCastTvShow;
    }

    async deleteCharacter(id: number) {
        return await this.castTvShowRepository.delete(id);
    }
}
