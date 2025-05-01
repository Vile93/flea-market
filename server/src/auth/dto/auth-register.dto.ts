import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthRegisterDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    surname: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    password: string;
}
