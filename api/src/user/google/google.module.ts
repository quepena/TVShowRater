import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthHelper } from '../auth/auth.helper';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/auth.strategy';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [GoogleController],
  providers: [GoogleService, AuthService, UserService, AuthHelper, JwtService, GoogleStrategy, JwtStrategy]
})
export class GoogleModule {}
