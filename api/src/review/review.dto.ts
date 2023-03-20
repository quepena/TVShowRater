import { IsNotEmpty } from "class-validator";

export class CreateReviewDto {
  @IsNotEmpty()
  tvShow: number;

  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  review: string;
}