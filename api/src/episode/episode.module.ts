import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Season } from 'src/entities';
import { EpisodeController } from './episode.controller';
import { Episode } from './episode.entity';
import { EpisodeService } from './episode.service';

@Module({
  imports: [TypeOrmModule.forFeature([Episode, Season]),],
  controllers: [EpisodeController],
  providers: [EpisodeService]
})
export class EpisodeModule {}
