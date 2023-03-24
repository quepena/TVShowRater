import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user.entity';
import { LoginDto, RegisterDto, TokenDto } from './auth.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

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
}
