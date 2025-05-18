import { IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class UpdateUserProfileDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    name: string;

    @IsOptional()
    @IsString()
    @Length(3, 50)
    surname: string;

    @IsOptional()
    @IsString()
    @Length(8, 24)
    oldPassword: string;

    @IsOptional()
    @IsString()
    @Length(8, 24)
    newPassword: string;

    @IsOptional()
    @IsString()
    avatar_path?: string;
}
