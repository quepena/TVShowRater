import { Body, Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../auth/auth.dto';
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

    // @Get('redirect')
    // @UseGuards(AuthGuard('google'))
    @Post()
    async googleAuthRedirect(@Body() token: Object) {
        Logger.log('info', token['token'])
        const ticket = await client.verifyIdToken({
            idToken: token['token'],
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        // log the ticket payload in the console to see what we have
        Logger.log('info', ticket.getPayload());
        // const ticketP = ticket.getPayload()
        // return ticketP
        const { email, given_name, family_name, picture, sub } = ticket.getPayload();
        return this.googleService.googleRegister({
            email: email,
            name: given_name,
            last_name: family_name,
            photo: picture,
            sub,
        })
    }
    // return this.googleService.googleRegister(token)
}
