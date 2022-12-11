import { IsNotEmpty } from "class-validator";

export class CreateEpisodeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  season: number;
}