import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

@Module({
  imports: [
    TypeOrmModule.forFeature([User, List, TvShow]),
  ],
  controllers: [GoogleController],
  providers: [GoogleService, AuthService, UserService, AuthHelper, JwtService, JwtStrategy, ListService]
})
export class GoogleModule {}
