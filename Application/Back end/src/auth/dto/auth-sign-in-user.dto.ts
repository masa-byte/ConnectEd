import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthSignInUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}