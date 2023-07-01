import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, UseInterceptors } from '@nestjs/common';
import { User } from '../user.entity';
import { LoginDto, RegisterDto, TokenDto } from './auth.dto';
import { AuthService } from './auth.service';
import { faker } from '@faker-js/faker'

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    register(@Body() body: RegisterDto): Promise<User | never> {
        return this.service.register(body);
    }

    @Post('login')
    login(@Body() body: LoginDto): Promise<TokenDto> {
        return this.service.login(body);
    }

    @Post('profile')
    getProfile(@Body() token: TokenDto) {
        return this.service.getProfile(token);
    }

    @Get('faker/users')
    async fakeUsers() {
        const rounds = 100;

        const name = faker.name.firstName();
        const lastName = faker.name.lastName()
        for (let index = 0; index < rounds; index++) {
            this.service.register({ name: name, last_name: lastName, email: faker.internet.email(name, lastName), password: faker.internet.password(), photo: faker.internet.avatar(), isAdmin: false } as RegisterDto)
        }

        return 0;
    }
}
