import { User, TvShow, Episode } from "src/entities";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Progress {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.progress)
    user: User;

    @ManyToOne(type => TvShow, tvShow => tvShow.progress)
    tvShow: TvShow;
    
    @ManyToOne(type => Episode, episode => episode.progress)
    episode: Episode;
}