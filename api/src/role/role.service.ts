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

    async findAllRoles(): Promise<Role[]> {
        return await this.roleRepository.find({ order: { name: 'ASC' } });
    }

    async findRoleById(id: number) {
        return this.roleRepository.findOneBy({ id: id })
    }

    async findRoleByName(name: string) {
        return this.roleRepository.findOneBy({ name: name })
    }

    async createRole(createRoleDto: CreateRoleDto) {
        const newRole = this.roleRepository.create(createRoleDto);
        return await this.roleRepository.save(newRole);
    }

    async deleteRole(id: number) {
        return await this.roleRepository.delete(id);
    }

    async updateRole(id: number, createRoleDto: CreateRoleDto) {
        await this.roleRepository.update(id, createRoleDto);
        const updatedRole = await this.roleRepository.findOneBy({ id: id });
        if (updatedRole) {
            return updatedRole;
        }
    }
}
