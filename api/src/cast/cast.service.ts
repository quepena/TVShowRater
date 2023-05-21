import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cast, CastTvShow, TvShow, Role } from 'src/entities';
import { Any, In, IsNull, Not, Repository } from 'typeorm';
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
        const { name, biography, photo, roles } = castDetails;
        const cast = new Cast();
        cast.name = name;
        cast.biography = biography;
        cast.photo = photo;
        cast.roles = []
        for (let i = 0; i < roles.length; i++) {
            const role = await this.roleRepository.findOne({
                where: { id: roles[i] }
            });
            cast.roles.push(role);
        }

        return await this.castRepository.save(cast);
    }

    async findCast() {
        return await this.castRepository.find({
            relations: ['castTvShow', 'castTvShow.tvShow', 'roles']
        });
    }

    async findActorsByShow(id: number) {
        const role = await this.roleRepository.findOne({ where: { name: 'Actor' } })
        const show = await this.tvShowRepository.find({
            where: { id: id }
        })

        const actor = await this.castRepository.find({
            where: { roles: role }
        });

        return await this.castTvShowRepository
        .find({
            where:
            {
                cast: actor,
                tvShow: show
            },
            relations: ['cast', 'tvShow', 'cast.roles'],
            take: 6,
            skip: 0,
        })
        // .createQueryBuilder()
        //     .select()
        //     .take(6)
        //     .skip(0)
        //     .where({ cast: actor }, { tvShow: show })
        //     .relation('cast', 'tvShow', 'cast.roles')
        //     .getMany()
    }

    async findCrew(id: number) {
        // const actors = this.findActorsByShow(id)
        // const role = await this.roleRepository.findOneBy({name: 'Director'})
        // console.log(role);
        
        const show = await this.tvShowRepository.find({
            where: { id: id }
        })
        // console.log(role);
        // const roleObj = role[0]
        

        // const actor = await this.castRepository
        // .createQueryBuilder("cast")
        // .where("cast.roles = ANY(:role)", {role: role})
        // .getMany()

        return await this.castTvShowRepository.find({
            where:
            {
                character: IsNull(),
                tvShow: show
            },
            relations: ['cast', 'tvShow', 'cast.roles'],
            take: 6,
            skip: 0,
        })
    }

    async findCastById(id: number) {
        return await this.castRepository.findOne({
            where: { id: id },
            relations: ['castTvShow', 'castTvShow.tvShow']
        });
    }

    async findCastByName(name: string) {
        return await this.castRepository.findOne({
            where: { name: name },
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
