import { IsNotEmpty } from "class-validator";

export class CreateTvShowDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    addId: string;

    @IsNotEmpty()
    genres: number[];

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
}