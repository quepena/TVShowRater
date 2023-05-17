import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany, JoinTable } from 'typeorm';
import { Role, TvShow } from "src/entities";

@Entity()
export class Cast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  photo: string;

  @Column({ nullable: true })
  biography: string;

  // @ManyToMany(type => TvShow, tvShow => tvShow.cast)
  // tvShows: TvShow[];

  @ManyToMany(type => Role, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  roles: Role[];

  @OneToMany(() => CastTvShow, castTvShow => castTvShow.cast)
  castTvShow: CastTvShow[];
}

@Entity('tv_show_cast_cast')
export class CastTvShow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  character: string;

  @ManyToOne(() => TvShow, tvShowId => tvShowId.castTvShow)
  tvShow: TvShow;

  @ManyToOne(() => Cast, castId => castId.castTvShow)
  cast: Cast;

  @ManyToMany(() => Role, roleId => roleId.castTvShow)
  @JoinTable()
  roles: Role[];
}