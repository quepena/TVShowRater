import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { TvShow } from "src/entities";

@Entity()
export class Cast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column()
  biography: string;

  @ManyToMany(type => TvShow, tvShow => tvShow.cast)
  tvShows: TvShow[];

  @OneToMany(() => CastTvShow, castTvShow => castTvShow.castId)
  castTvShow: CastTvShow[];
}

@Entity('tv_show_cast_cast')
export class CastTvShow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  character: string;

  @ManyToOne(() => TvShow, tvShowId => tvShowId.castTvShow)
  tvShowId: TvShow;

  @ManyToOne(() => Cast, castId => castId.castTvShow)
  castId: TvShow;
}