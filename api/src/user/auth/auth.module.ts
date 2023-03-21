import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvShow, Genre, Season, Episode } from 'src/entities';
import { EpisodeService } from 'src/episode/episode.service';
import { GenreService } from 'src/genre/genre.service';
import { List } from 'src/list/list.entity';
import { ListService } from 'src/list/list.service';
import { SeasonService } from 'src/season/season.service';
import { TvShowService } from 'src/tv-show/tv-show.service';
import { User } from '../user.entity';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
    TypeOrmModule.forFeature([User, List, TvShow, Genre, Season, Episode]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy, ListService, TvShowService, GenreService, SeasonService, EpisodeService]
})
export class AuthModule { }
