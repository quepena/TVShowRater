import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsString()
    photo: string;

    @IsString()
    password: string;

    @IsBoolean()
    isAdmin: boolean;

    lists: number[]
}