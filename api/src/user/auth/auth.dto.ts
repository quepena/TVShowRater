import { Trim } from 'class-sanitizer';
import { IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  public readonly password: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly last_name: string;

  @IsString()
  public readonly email: string;

  @IsString()
  public readonly photo: string;

  @IsString()
  public readonly isAdmin: boolean;
}

export class LoginDto {
  @IsString()
  public readonly password: string;

  @IsString()
  public readonly email: string;
}

export class TokenDto {
  @IsString()
  public readonly token: string;
}