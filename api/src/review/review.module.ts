import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, TvShow, Review } from 'src/entities';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, TvShow, Review]),],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
