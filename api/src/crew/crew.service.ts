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

    findCrew() {
        return this.crewRepository.find();
    }
}
