import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from '../list/list.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(List) private readonly listRepository: Repository<List>,
    ) { }

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.find({
            order: { last_name: 'ASC' }
        });
    }

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id: id })
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete(id);
    }

    async updateUser(id: number, userDetails: CreateUserDto): Promise<User> {
        const { name, last_name, email, photo, password, isAdmin } = userDetails;
        const user = new User();
        user.name = name;
        user.last_name = last_name;
        user.email = email;
        user.photo = photo;
        user.password = password;
        user.isAdmin = isAdmin;
        // for (let i = 0; i < lists.length; i++) {
        //     const list = await this.listRepository.findOne({
        //         where: { id: lists[i] }
        //     });
        //     user.lists.push(list);
        // }
        const updatedUser = await this.userRepository.save({ id: Number(id), name: user.name, last_name: user.last_name, email: user.email, photo: user.photo, password: user.password, isAdmin: user.isAdmin });

        return updatedUser;
    }
}
