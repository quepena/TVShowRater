import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../auth/auth.dto';
import { GoogleService } from './google.service';

@Controller('google')
export class GoogleController {
    constructor(private readonly googleService: GoogleService) { }

    @Get('')
    @UseGuards(AuthGuard('google'))
    async googleAuth() { }

    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.googleService.googleRegister(req)
    }
}
