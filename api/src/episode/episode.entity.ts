import { Season } from 'src/entities';
import { Progress } from 'src/progress/progress.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Season, season => season.episodes)
  season: Season;

  @Column()
  name: string;

  @OneToMany(type => Progress, progress => progress.episode)
  progress: Progress[];
}