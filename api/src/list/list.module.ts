import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvShow, User } from 'src/entities';
import { ListController } from './list.controller';
import { List } from './list.entity';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([TvShow, User, List]),],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
