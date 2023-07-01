import { IsNotEmpty } from "class-validator";

export class CreateProgressDto {
  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  episode: number;
}