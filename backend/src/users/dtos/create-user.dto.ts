import { IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Gender, Role } from "../../../utils/enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({ example: 'john.doe@example.com', description: 'User email address' })
    @IsEmail()
    @MaxLength(150)
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'John Doe', description: 'User full name' })
    @MinLength(3)
    @IsNotEmpty()
    full_name: string;

    @ApiPropertyOptional({ example: 'password123', description: 'User password (optional for initial creation)', minLength: 6 })
    @IsString()
    @MinLength(6)
    @IsOptional()
    password?: string;

    @ApiProperty({ example: '29001010101012', description: 'National ID (14 digits)' })
    @IsNotEmpty()
    @IsString()
    @MinLength(14)
    @MaxLength(14)
    national_id: string;

    @ApiProperty({ example: '1990-01-01', description: 'Date of birth' })
    @IsDateString()
    @IsNotEmpty()
    date_of_birth: string;

    @ApiProperty({ example: '01000000000', description: 'Phone number (11 digits)' })
    @IsNotEmpty()
    @IsString()
    @MinLength(11)
    @MaxLength(11)
    phone: string;

    @ApiProperty({ example: '123 Street Name, City', description: 'Physical address' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    address: string;

    @ApiPropertyOptional({ enum: Role, default: Role.STUDENT })
    @IsEnum(Role)
    @IsOptional()
    role: Role;

    @ApiProperty({ enum: Gender })
    @IsEnum(Gender)
    @IsNotEmpty()
    gender: Gender;
}