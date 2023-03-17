import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleModule } from './google/google.module';
import { List } from 'src/list/list.entity';
import { TvShow } from 'src/entities';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AuthModule, TypeOrmModule.forFeature([User, List, TvShow]), GoogleModule,]
})
export class UserModule { }
