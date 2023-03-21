import { IsNotEmpty } from "class-validator";

export class CreateCrewDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  photo: string;
  
  @IsNotEmpty()
  biography: string;

  @IsNotEmpty()
  roles: number[];
}

export class CreateCrewTvShowDto {
  @IsNotEmpty()
  roles: number[];
  
  @IsNotEmpty()
  crew: number;

  @IsNotEmpty()
  tvShow: number;
}