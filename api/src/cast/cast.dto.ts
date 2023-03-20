import { IsNotEmpty } from "class-validator";

export class CreateCastDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  photo: string;
  
  @IsNotEmpty()
  biography: string;

  tvShows: number[];
}

export class CreateCastTvShowDto {
  @IsNotEmpty()
  character: string;
  
  @IsNotEmpty()
  castId: number;

  @IsNotEmpty()
  tvShowId: number;
}