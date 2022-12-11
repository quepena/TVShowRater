import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ) { }

    createRole(createRoleDto: CreateRoleDto) {
        const newRole = this.roleRepository.create(createRoleDto);
        return this.roleRepository.save(newRole);
    }

    findRoles() {
        return this.roleRepository.find();
    }

    findRole(id: number) {
        return this.roleRepository.findOneBy({id: id});
    }
}
