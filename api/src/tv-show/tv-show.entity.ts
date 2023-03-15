import { Genre, Season } from 'src/entities';
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
}