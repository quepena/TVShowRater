import { Role, TvShow } from 'src/entities';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Crew {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  biography: string;

  @ManyToMany(type => Role, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => CrewTvShow, crewTvShow => crewTvShow.crew)
  crewTvShow: CrewTvShow[];
}

@Entity('tv_show_crew_crew')
export class CrewTvShow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Role, roleId => roleId.crewTvShow)
  @JoinTable()
  roles: Role[];

  @ManyToOne(() => TvShow, tvShowId => tvShowId.crewTvShow)
  tvShow: TvShow;

  @ManyToOne(() => Crew, crewId => crewId.crewTvShow)
  crew: Crew;
}