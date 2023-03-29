import { TvShow, User } from "src/entities";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(type => TvShow, tvShow => tvShow.lists, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    tvShows: TvShow[];

    @ManyToOne(type => User, user => user.lists, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    })
    user: User;

    @Column()
    name: string;
}