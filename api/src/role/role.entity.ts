import { CastTvShow } from 'src/entities';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => CastTvShow, castTvShow => castTvShow.roles)
  castTvShow: CastTvShow[];
}