import { IsNotEmpty } from "class-validator";

export class CreateSeasonDto {
  @IsNotEmpty()
  tvShow: number;

  @IsNotEmpty()
  numSeason: number;
}