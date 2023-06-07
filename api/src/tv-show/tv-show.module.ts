import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode, Genre, Season, Cast } from 'src/entities';
import { Rating } from 'src/rating/rating.entity';
import { TvShowController } from './tv-show.controller';
import { TvShow } from './tv-show.entity';
import { TvShowService } from './tv-show.service';
import { Review } from 'src/review/review.entity';
import { GenreService } from 'src/genre/genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([TvShow, Genre, Episode, Season, Rating, Review, Cast]),],
  controllers: [TvShowController],
  providers: [TvShowService, GenreService]
})
export class TvShowModule {}
