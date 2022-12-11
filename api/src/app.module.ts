import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './entities';
import { GenreModule } from './genre/genre.module';
import { CastModule } from './cast/cast.module';
import { RoleModule } from './role/role.module';
import { CrewModule } from './crew/crew.module';
import { UserModule } from './user/user.module';
import { TvShowModule } from './tv-show/tv-show.module';
import { SeasonModule } from './season/season.module';
import { EpisodeModule } from './episode/episode.module';
import { ListModule } from './list/list.module';
import { ReviewModule } from './review/review.module';
import { RatingModule } from './rating/rating.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GenreModule,
    CastModule,
    RoleModule,
    CrewModule,
    UserModule,
    TvShowModule,
    SeasonModule,
    EpisodeModule,
    ListModule,
    ReviewModule,
    RatingModule,
    ProgressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
