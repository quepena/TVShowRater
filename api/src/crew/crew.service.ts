import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateCrewDto } from './crew.dto';
import { Crew } from './crew.entity';

@Injectable()
export class CrewService {
    constructor(
        @InjectRepository(Crew) private readonly crewRepository: Repository<Crew>,
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
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
        crew.id = id;
        crew.name = name;
        crew.photo = photo;
        crew.biography = biography;
        crew.roles = [];
        console.log(crewDetails);
        for (let i = 0; i < roles.length; i++) {
            const role = await this.roleRepository.findOne({
                where: { id: roles[i] }
            });
            console.log(role);
            crew.roles.push(role);
        }
        console.log(crewDetails);

        const newV = await this.crewRepository.update(id, crewDetails);
        return newV
        
        // const updatedCrew = this.crewRepository.findOneBy({
        //    id: id,
        // });

        // if (updatedCrew) {
        //     return updatedCrew
        // }
    }
}
