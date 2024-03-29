import { Genre, Season, CastTvShow } from 'src/entities';
import { List } from 'src/list/list.entity';
import { Rating } from 'src/rating/rating.entity';
import { Review } from 'src/review/review.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TvShow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    addId: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    year: string;

    @ManyToMany(type => Genre, genre => genre.tvshows)
    @JoinTable()
    genres: Genre[]

    @Column()
    description: string;

    @Column()
    country: string;

    @Column()
    photo: string;

    @Column({ nullable: true })
    length: number;

    @Column({ nullable: true })
    trailer: string;

    @OneToMany(type => Season, season => season.tvShow)
    seasons: Season[]

    @ManyToMany(type => List, list => list.tvShows)
    @JoinTable()
    lists: List[]

    @OneToMany(type => Rating, rating => rating.tvShow)
    ratings: Rating[];

    @OneToMany(type => Review, review => review.tvShow)
    reviews: Review[];

    @OneToMany(() => CastTvShow, castTvShow => castTvShow.tvShow)
    castTvShow: CastTvShow[];
}