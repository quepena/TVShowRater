import { IsNotEmpty } from "class-validator";

export class CreateListDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tvShows: number[];

  user: number;
}