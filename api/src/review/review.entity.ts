import { TvShow, User } from "src/entities";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.ratings)
    user: User;

    @ManyToOne(type => TvShow, tvShow => tvShow.ratings)
    tvShow: TvShow;

    @Column()
    review: string;
}