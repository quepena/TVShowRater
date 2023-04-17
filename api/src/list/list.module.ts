import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CastService } from 'src/cast/cast.service';
import { CrewService } from 'src/crew/crew.service';
import { Genre, TvShow, User, Season, Cast, Crew, Episode, CastTvShow, Role } from 'src/entities';
import { EpisodeService } from 'src/episode/episode.service';
import { GenreService } from 'src/genre/genre.service';
import { RoleService } from 'src/role/role.service';
import { SeasonService } from 'src/season/season.service';
import { TvShowService } from 'src/tv-show/tv-show.service';
import { UserService } from 'src/user/user.service';
import { ListController } from './list.controller';
import { List } from './list.entity';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([TvShow, User, List, Genre, Season, Cast, Crew, Episode, CastTvShow, Role]),],
  controllers: [ListController],
  providers: [ListService, TvShowService, UserService, GenreService, SeasonService, CastService, CrewService, EpisodeService, RoleService]
})
export class ListModule {}
