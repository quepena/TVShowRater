import { IsNotEmpty } from "class-validator";

export class CreateProgressDto {
  @IsNotEmpty()
  tvShow: number[];

  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  episode: number;
}