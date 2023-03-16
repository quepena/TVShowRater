import { IsNotEmpty } from "class-validator";

export class CreateSeasonDto {
  @IsNotEmpty()
  tvShow: number;

  episodes: number[];

  @IsNotEmpty()
  numSeason: number;
}