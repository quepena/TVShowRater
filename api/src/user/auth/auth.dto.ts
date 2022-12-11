import { Trim } from 'class-sanitizer';
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsString()
  @MinLength(5)
  public readonly name: string;
  @IsString()
  @MinLength(5)
  public readonly last_name: string;
}

export class LoginDto {
  @Trim()
  @IsString()
  public readonly name: string;

  @Trim()
  @IsString()
  public readonly last_name: string;

  @IsString()
  public readonly password: string;
}