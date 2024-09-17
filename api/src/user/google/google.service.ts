import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { User } from '../user.entity';

@Injectable()
export class GoogleService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
        @Inject(AuthService) private readonly authRepository: AuthService,
    ) { }

    async googleRegister(body: any) {
        const { email, name, last_name, photo, sub } = body;

        const newUser = new User();

        newUser.email = email;
        newUser.name = name;
        newUser.last_name = last_name;
        newUser.photo = photo;
        newUser.isAdmin = false;
        newUser.isOnboarded = false;
        newUser.password = sub;

        const userExists = await this.repository.find({ where: { email: newUser.email } })

        if (userExists.length > 0) {
            return this.authRepository.login({ email: newUser.email, password: newUser.password })
        } else {
            return this.authRepository.register(newUser)
        }
    }
}
