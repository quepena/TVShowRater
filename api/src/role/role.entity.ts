import { CrewTvShow } from 'src/crew/crew.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CrewTvShow, crewTvShow => crewTvShow.roles)
  crewTvShow: CrewTvShow[];
}