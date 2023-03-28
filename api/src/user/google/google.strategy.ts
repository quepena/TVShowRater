import { config } from 'dotenv';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

config();

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//     constructor() {
//         super({
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_SECRET,
//             callbackURL: 'http://localhost:5000/google/redirect',
//             scope: ['email', 'profile'],
//         });
//     }

//     async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
//         Logger.log('warn', profile)
//         const { name, emails, photos, id } = profile

//         const user = {
//             email: emails[0].value,
//             name: name.givenName,
//             last_name: name.familyName,
//             photo: photos[0].value,
//             id,
//             accessToken
//         }
//         done(null, user);
//     }
// }