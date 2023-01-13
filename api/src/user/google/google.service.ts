import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from '../auth/auth.dto';
import { AuthHelper } from '../auth/auth.helper';
import { AuthService } from '../auth/auth.service';
import { User } from '../user.entity';

@Injectable()
export class GoogleService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
        @Inject(AuthService) private readonly authRepository: AuthService,
        @Inject(AuthHelper) private readonly helper: AuthHelper,
    ) { }

    async googleRegister(req: { user: any; }) {
        const { email, name, last_name, photo, accessToken } = req.user;

        const newUser = new User();

        newUser.email = email;
        newUser.name = name;
        newUser.last_name = last_name;
        newUser.photo = photo;
        newUser.isAdmin = false;
        newUser.password = accessToken;

        const userExists = await this.repository.find({ where: { email: newUser.email } })
        console.log(newUser.password);
        

        if (userExists) {
            return this.authRepository.login({email: newUser.email, password: newUser.password})
        } else {
            return this.authRepository.register(newUser)
        }
    }

    async googleLogin(req: { user: any; }) {
        console.log(req.user);

        const { email } = req.user;
        const user: User = await this.repository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        this.helper.generateToken(user);

        return user;
    }
}
