import { IsNotEmpty } from "class-validator";

export class CreateTvShowDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    genres: number[];

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    country: string;

    @IsNotEmpty()
    photo: string;

    @IsNotEmpty()
    length: number;

    @IsNotEmpty()
    trailer: string;

    seasons: number[]

    lists: number[]

    ratings: number[]
}