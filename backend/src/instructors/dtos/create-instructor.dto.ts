import { IsEnum, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Department, InstructorDegree, InstructorRank } from "../../../utils/enum";
import { CreateUserDto } from "../../users/dtos/create-user.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateInstructorDto {
    @ApiProperty({ type: CreateUserDto, description: 'User information' })
    @ValidateNested()
    @Type(() => CreateUserDto)
    @IsNotEmptyObject()
    user: CreateUserDto;

    @ApiProperty({ example: 'INS001', description: 'Instructor unique code' })
    @IsString()
    @IsNotEmpty()
    instructor_code: string;

    @ApiProperty({ enum: InstructorRank })
    @IsEnum(InstructorRank)
    @IsNotEmpty()
    instructor_rank: InstructorRank;

    @ApiProperty({ enum: Department })
    @IsEnum(Department)
    @IsNotEmpty()
    department: Department;

    @ApiProperty({ enum: InstructorDegree })
    @IsEnum(InstructorDegree)
    @IsNotEmpty()
    instructor_degree: InstructorDegree;

    @ApiPropertyOptional({ example: 'Expert in AI', description: 'Additional notes' })
    @IsString()
    @IsOptional()
    notes: string;
}