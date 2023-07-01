import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleService } from './google.service';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
);

@Controller('google')
export class GoogleController {
    constructor(private readonly googleService: GoogleService) { }

    @Get('')
    @UseGuards(AuthGuard('google'))
    async googleAuth() { }

    @Post()
    async googleAuthRedirect(@Body() token: Object) {
        const ticket = await client.verifyIdToken({
            idToken: token['token'],
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, given_name, family_name, picture, sub } = ticket.getPayload();
        return this.googleService.googleRegister({
            email: email,
            name: given_name,
            last_name: family_name,
            photo: picture,
            sub,
        })
    }
}
