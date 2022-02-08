import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class BaseUserDto {
    @IsEmail()
    email?: string

    @IsString()
    uid?: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    password?: string
}