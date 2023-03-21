import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, TvShow } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCrewDto, CreateCrewTvShowDto } from './crew.dto';
import { Crew, CrewTvShow } from './crew.entity';

@Injectable()
export class CrewService {
    constructor(
        @InjectRepository(Crew) private readonly crewRepository: Repository<Crew>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
        @InjectRepository(TvShow) private readonly tvShowRepository: Repository<TvShow>,
        @InjectRepository(CrewTvShow) private readonly crewTvShowRepository: Repository<CrewTvShow>,
    ) { }

    async createCrew(crewDetails: CreateCrewDto): Promise<Crew> {
        const { name, photo, biography, roles } = crewDetails;
        const crew = new Crew();
        crew.name = name;
        crew.photo = photo;
        crew.biography = biography;
        crew.roles = [];
        for (let i = 0; i < roles.length; i++) {
            const role = await this.roleRepository.findOne({
                where: { id: roles[i] }
            });
            crew.roles.push(role);
        }

        return await this.crewRepository.save(crew);
    }

    async findCrew() {
        return await this.crewRepository.find({
            relations: {
                roles: true
            }
        });
    }

    async findCrewById(id: number) {
        return this.crewRepository.findOneBy({ id: id })
    }

    async deleteCrew(id: number) {
        return await this.crewRepository.delete(id);
    }

    async updateCrew(id: number, crewDetails: any) {
        const { name, photo, biography, roles } = crewDetails;
        const crew = new Crew();
        crew.name = name;
        crew.photo = photo;
        crew.biography = biography;
        crew.roles = [];
        console.log(crewDetails);
        console.log(id);

        for (let i = 0; i < roles.length; i++) {
            const role = await this.roleRepository.findOne({
                where: { id: roles[i] }
            });
            console.log(role);
            crew.roles.push(role);
        }
        console.log(crewDetails);
        console.log(roles);


        const newCrew = await this.crewRepository.save(
            { id: Number(id), name: crewDetails.name, biography: crewDetails.biography, roles: crewDetails.roles, photo: crewDetails.photo }
        );
        
        return newCrew
    }

    async createCrewTvShow(crewTvShowDetails: CreateCrewTvShowDto): Promise<CrewTvShow> {
        const { tvShow, crew, roles } = crewTvShowDetails;
        const newCrew = new CrewTvShow();
        newCrew.tvShow = await this.tvShowRepository.findOne({ where: { id: tvShow } })
        newCrew.crew = await this.crewRepository.findOne({ where: { id: crew } })
        newCrew.roles = []
        for (let i = 0; i < roles.length; i++) {
            const role = await this.roleRepository.findOne({
                where: { id: roles[i] }
            });
            newCrew.roles.push(role);
        }

        return await this.crewTvShowRepository.save(newCrew);
    }

    async findCrewTvShow() {
        return await this.crewTvShowRepository.find({
            relations: {
                tvShow: true,
                crew: true,
                roles: true,
            }
        });
    }

    async findCrewTvShowById(id: number) {
        return await this.crewTvShowRepository.findOne({
            where: { id: id },
            relations: {
                tvShow: true,
                crew: true,
                roles: true,
            }
        });
    }

    async updateCrewTvShow(id: number, crewTvShowDetails: CreateCrewTvShowDto): Promise<CrewTvShow> {
        const { tvShow, crew, roles } = crewTvShowDetails;
        const newCrew = new CrewTvShow();
        newCrew.tvShow = await this.tvShowRepository.findOne({ where: { id: tvShow } })
        newCrew.crew = await this.crewRepository.findOne({ where: { id: crew } })
        newCrew.roles = []
        for (let i = 0; i < roles.length; i++) {
            const role = await this.roleRepository.findOne({
                where: { id: roles[i] }
            });
            newCrew.roles.push(role);
        }

        const updatedCrewTvShow = await this.crewTvShowRepository.save({ id: Number(id), tvShow: newCrew.tvShow, crew: newCrew.crew, roles: newCrew.roles });

        return updatedCrewTvShow;
    }

    async deleteCrewTvShow(id: number) {
        return await this.crewTvShowRepository.delete(id);
    }

    async findCrewTvShowByTvShow(id: number) {
        return await this.crewTvShowRepository.find({
            where: { tvShow: { id: id } },
            relations: {
                tvShow: true,
                crew: true,
                roles: true
            }
        });
    }

    async findRolesByTvShow(id: number) {
        return await this.crewTvShowRepository.find({
            where: { tvShow: { id: id } },
            relations: {
                roles: true
            }
        });
    }
}
