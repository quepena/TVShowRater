import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, TvShow, Rating } from 'src/entities';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, TvShow, Rating]),],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule {}
