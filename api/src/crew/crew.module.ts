import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities';
import { CrewController } from './crew.controller';
import { Crew } from './crew.entity';
import { CrewService } from './crew.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crew, Role]),],
  controllers: [CrewController],
  providers: [CrewService]
})
export class CrewModule {}
