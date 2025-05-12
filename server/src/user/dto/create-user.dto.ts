import { Role } from '@prisma/client';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { IRole } from 'src/common/types/role.type';
import { keys } from 'ts-transformer-keys';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name: string;

    @IsOptional()
    @IsString()
    @Length(3, 50)
    surname: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 24)
    password: string;

    @IsOptional()
    @IsString()
    avatar_path?: string;

    @IsNotEmpty()
    @IsIn(keys<Omit<IRole, typeof Role.ROOT>>())
    role: Role;

    @IsString()
    @Length(12)
    phone: string;
}
