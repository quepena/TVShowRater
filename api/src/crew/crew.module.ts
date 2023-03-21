import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, TvShow } from 'src/entities';
import { CrewController } from './crew.controller';
import { Crew, CrewTvShow } from './crew.entity';
import { CrewService } from './crew.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crew, Role, TvShow, CrewTvShow]),],
  controllers: [CrewController],
  providers: [CrewService]
})
export class CrewModule {}
