import { IsNotEmpty } from "class-validator";

export class CreateSeasonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tvShow: number;

  episodes: number[];

  @IsNotEmpty()
  numSeason: number;
}