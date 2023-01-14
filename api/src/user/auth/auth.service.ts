import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from './auth.helper';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
    @InjectRepository(User) private readonly repository: Repository<User>;
    @Inject(AuthHelper) private readonly helper: AuthHelper;

    public async register(body: RegisterDto): Promise<User | never> {
        const { name, last_name, email, photo, password, isAdmin }: RegisterDto = body;
        let user: User = await this.repository.findOne({ where: { last_name } });

        if (user) {
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
        }

        user = new User();

        user.name = name;
        user.last_name = last_name;
        user.email = email;
        user.photo = photo;        
        user.password = this.helper.encodePassword(password);
        console.log("register " + user.password);
        user.isAdmin = isAdmin;

        await this.repository.save(user);

        return user
    }

    public async login(body: LoginDto): Promise<string | never> {
        const { email, password }: LoginDto = body;
        const user: User = await this.repository.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }
            
        const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);

        if (!isPasswordValid) {
            throw new HttpException('Incorrect password', HttpStatus.NOT_FOUND);
        }

        return this.helper.generateToken(user);
    }

    public async refresh(user: User): Promise<string> {
        return this.helper.generateToken(user);
    }
}