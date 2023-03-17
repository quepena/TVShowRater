import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvShow } from 'src/entities';
import { List } from 'src/list/list.entity';
import { ListService } from 'src/list/list.service';
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
    TypeOrmModule.forFeature([User, List, TvShow]),
  ],
  controllers: [GoogleController],
  providers: [GoogleService, AuthService, UserService, AuthHelper, JwtService, GoogleStrategy, JwtStrategy, ListService]
})
export class GoogleModule {}
