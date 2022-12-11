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