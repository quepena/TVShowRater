import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvShow, Episode } from 'src/entities';
import { SeasonController } from './season.controller';
import { Season } from './season.entity';
import { SeasonService } from './season.service';

@Module({
  imports: [TypeOrmModule.forFeature([Season, TvShow, Episode]),],
  controllers: [SeasonController],
  providers: [SeasonService]
})
export class SeasonModule {}
