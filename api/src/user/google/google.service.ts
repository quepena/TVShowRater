import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthHelper } from '../auth/auth.helper';
import { AuthService } from '../auth/auth.service';
import { User } from '../user.entity';

@Injectable()
export class GoogleService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
        @Inject(AuthService) private readonly authService: AuthService,
        @Inject(AuthHelper) private readonly helper: AuthHelper,
    ) { }

    async googleRegister(req: { user: any; }) {
        console.log(req.user);

        const { email, accessToken } = req.user;
        let user: User = await this.repository.findOne({ where: { email: email } });

        if (user) {
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }

        user = new User();

        user.email = email;
        user.password = accessToken;

        await this.repository.save(user);

        return user
    }

    async googleLogin(req: { user: any; }) {
        console.log(req.user);

        const { email } = req.user;
        const user: User = await this.repository.findOne({ where: { email: email } });

        if (!user) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        return this.helper.generateToken(user);
    }
}
