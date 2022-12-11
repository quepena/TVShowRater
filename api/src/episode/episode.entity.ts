import { Season } from 'src/entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Season, season => season.episodes)
  season: Season;

  @Column()
  name: string;
}