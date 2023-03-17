import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode, Genre, Season } from 'src/entities';
import { TvShowController } from './tv-show.controller';
import { TvShow } from './tv-show.entity';
import { TvShowService } from './tv-show.service';

@Module({
  imports: [TypeOrmModule.forFeature([TvShow, Genre, Episode, Season]),],
  controllers: [TvShowController],
  providers: [TvShowService]
})
export class TvShowModule {}
