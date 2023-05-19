import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvShow, Episode, Genre, Cast } from 'src/entities';
import { EpisodeService } from 'src/episode/episode.service';
import { TvShowService } from 'src/tv-show/tv-show.service';
import { SeasonController } from './season.controller';
import { Season } from './season.entity';
import { SeasonService } from './season.service';

@Module({
  imports: [TypeOrmModule.forFeature([Season, TvShow, Episode, Genre, Cast]),],
  controllers: [SeasonController],
  providers: [SeasonService, TvShowService, EpisodeService]
})
export class SeasonModule {}
