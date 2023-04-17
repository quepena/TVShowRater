import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user.entity';
import { LoginDto, RegisterDto, TokenDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
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

    // @Post('refresh')
    // @UseGuards(JwtAuthGuard)
    // private refresh(@Req() { user }: Request): Promise<string | never> {
    //     return this.service.refresh(<User>user);
    // }

    @Get('profile')
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
