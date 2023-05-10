import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season, TvShow, Genre, Cast } from 'src/entities';
import { SeasonService } from 'src/season/season.service';
import { TvShowService } from 'src/tv-show/tv-show.service';
import { EpisodeController } from './episode.controller';
import { Episode } from './episode.entity';
import { EpisodeService } from './episode.service';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Season, TvShow, Genre, Cast]),],
  controllers: [EpisodeController],
  providers: [EpisodeService, SeasonService, TvShowService]
})
export class EpisodeModule {}
