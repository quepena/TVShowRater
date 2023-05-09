import { IsNotEmpty } from "class-validator";

export class CreateTvShowDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    genres: string[];

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    photo: string;

    year: string;

    @IsNotEmpty()
    length: number;
    
    trailer: string;

    seasons: number[]

    lists: number[]

    ratings: number[]

    castTvShow: number[]
}