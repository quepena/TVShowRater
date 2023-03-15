import { TvShow, Episode } from 'src/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => TvShow, tvShow => tvShow.seasons)
  tvShow: TvShow;

  @OneToMany(type => Episode, episode => episode.season)
  episodes: Episode[];

  @Column()
  numSeason: number;
}