import { IsNotEmpty } from "class-validator";

export class CreateCastDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  photo: string;
  
  @IsNotEmpty()
  biography: string;
}