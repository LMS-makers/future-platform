import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({ example: '29001010101012', description: 'National ID (14 digits)' })
    @IsNotEmpty()
    @IsString()
    @MinLength(14)
    @MaxLength(14)
    national_id: string;

    @ApiProperty({ example: 'password123', description: 'User password' })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}