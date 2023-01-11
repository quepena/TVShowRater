import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthHelper } from '../auth/auth.helper';
import { AuthService } from '../auth/auth.service';
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
  providers: [GoogleService, AuthService, UserService, AuthHelper, JwtService, GoogleStrategy]
})
export class GoogleModule {}
