import { Module } from '@nestjs/common';
import { CastService } from './cast.service';
import { CastController } from './cast.controller';
import { Cast, TvShow, CastTvShow, Role, Genre, Season, Episode } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from 'src/role/role.service';
import { TvShowService } from 'src/tv-show/tv-show.service';
import { GenreService } from 'src/genre/genre.service';
import { SeasonService } from 'src/season/season.service';
import { EpisodeService } from 'src/episode/episode.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cast, TvShow, CastTvShow, Role, Genre, Season, Episode]),],
  providers: [CastService, RoleService, TvShowService, GenreService, SeasonService, EpisodeService],
  controllers: [CastController]
})
export class CastModule {}
