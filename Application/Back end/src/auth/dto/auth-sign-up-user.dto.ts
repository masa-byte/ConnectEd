import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthSignUpUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    type: string;
}