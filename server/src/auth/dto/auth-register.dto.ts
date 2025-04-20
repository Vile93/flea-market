import { IsNotEmpty } from 'class-validator';

export class AuthRegisterDto {
    @IsNotEmpty()
    name: string;
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
