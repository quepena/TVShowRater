import { TvShow, User } from "src/entities";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.ratings)
    user: User;

    @ManyToOne(type => TvShow, tvShow => tvShow.ratings)
    tvShow: TvShow;

    rating: number;
}