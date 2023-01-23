import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find({
            order: { last_name: 'ASC' }
        });
    }

    async findUserById(id: number) {
        return await this.userRepository.findOneBy({ id: id })
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete(id);
    }

    async updateUser(id: number, createUserDto: CreateUserDto) {
        await this.userRepository.update(id, createUserDto);
        const updatedUser = await this.userRepository.findOneBy({ id: id });
        if (updatedUser) {
            return updatedUser;
        }
    }
}
