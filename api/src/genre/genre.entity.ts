import { TvShow } from 'src/entities';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(type => TvShow, tvshow => tvshow.genres)
  tvshows: TvShow[]
}