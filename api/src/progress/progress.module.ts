import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvShow, User, Episode } from 'src/entities';
import { ProgressController } from './progress.controller';
import { Progress } from './progress.entity';
import { ProgressService } from './progress.service';

@Module({
  imports: [TypeOrmModule.forFeature([Progress, TvShow, User, Episode]),],
  controllers: [ProgressController],
  providers: [ProgressService]
})
export class ProgressModule {}
