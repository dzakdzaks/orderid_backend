import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class BaseUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    uid: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    restaurant?: string
}