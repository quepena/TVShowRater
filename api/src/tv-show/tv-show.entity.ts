import { CrewTvShow } from 'src/crew/crew.entity';
import { Genre, Season, Cast, CastTvShow } from 'src/entities';
import { List } from 'src/list/list.entity';
import { Progress } from 'src/progress/progress.entity';
import { Rating } from 'src/rating/rating.entity';
import { Review } from 'src/review/review.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TvShow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Genre, genre => genre.tvshows)
    @JoinTable()
    genres: Genre[]

    @Column()
    description: string;

    @Column()
    country: string;

    @Column()
    photo: string;

    @Column()
    length: number;

    @Column()
    trailer: string;

    @OneToMany(type => Season, season => season.tvShow)
    seasons: Season[]

    @ManyToMany(type => List, list => list.tvShows)
    @JoinTable()
    lists: List[]

    @OneToMany(type => Progress, progress => progress.tvShow)
    progress: Progress[];

    @OneToMany(type => Rating, rating => rating.tvShow)
    ratings: Rating[];

    @OneToMany(type => Review, review => review.tvShow)
    reviews: Review[];

    // @ManyToMany(type => Cast, cast => cast.tvShows)
    // @JoinTable()
    // cast: Cast[]

    @OneToMany(() => CastTvShow, castTvShow => castTvShow.tvShow)
    castTvShow: CastTvShow[];

    @OneToMany(() => CrewTvShow, crewTvShow => crewTvShow.tvShow)
    crewTvShow: CrewTvShow[];
}