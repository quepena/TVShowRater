import { IsNotEmpty } from "class-validator";

export class CreateCastDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  photo: string;
  
  @IsNotEmpty()
  biography: string;

  roles: number[]
}

export class CreateCastTvShowDto {
  @IsNotEmpty()
  character: string;
  
  @IsNotEmpty()
  cast: number;

  @IsNotEmpty()
  tvShow: number;
}