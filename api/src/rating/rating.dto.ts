import { IsNotEmpty } from "class-validator";

export class CreateRatingDto {
  @IsNotEmpty()
  tvShow: number;

  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  rating: number;
}