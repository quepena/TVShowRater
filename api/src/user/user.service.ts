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

    async findUserById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({ id: id })
    }

    async deleteUser(id: number) {
        return await this.userRepository.delete(id);
    }

    async updateUser(id: number, userDetails: CreateUserDto): Promise<User> {
        const user = new User();
        user.name = userDetails.name;
        user.last_name =  userDetails.last_name;
        user.email =  userDetails.email;
        user.photo =  userDetails.photo;
        user.password =  userDetails.password;
        user.isAdmin =  userDetails.isAdmin;
        user.isOnboarded =  userDetails.isOnboarded;

        const updatedUser = await this.userRepository.save({ ...userDetails });

        return updatedUser;
    }
}
