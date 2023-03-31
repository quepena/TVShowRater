import { Module } from '@nestjs/common';
import { CastService } from './cast.service';
import { CastController } from './cast.controller';
import { Cast, TvShow, CastTvShow, Role } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cast, TvShow, CastTvShow, Role]),],
  providers: [CastService],
  controllers: [CastController]
})
export class CastModule {}
