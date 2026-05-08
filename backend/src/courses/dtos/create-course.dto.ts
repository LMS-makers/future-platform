import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional } from "class-validator";
import { CreditHours, Department, Level, Semester } from "../../../utils/enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCourseDto {
    @ApiProperty({ example: 'CS101', description: 'Unique course code' })
    @IsString()
    @IsNotEmpty()
    course_code: string;

    @ApiProperty({ example: 'Introduction to Computer Science', description: 'Name of the course' })
    @IsString()
    @IsNotEmpty()
    course_name: string;

    @ApiProperty({ example: 'Fundamental concepts of CS', description: 'Detailed description' })
    @IsString()
    @IsNotEmpty()
    course_description: string;

    @ApiProperty({ enum: CreditHours })
    @IsEnum(CreditHours)
    @IsNotEmpty()
    course_credit_hours: CreditHours;

    @ApiProperty({ enum: Semester })
    @IsEnum(Semester)
    @IsNotEmpty()
    course_semester: Semester;

    @ApiProperty({ enum: Department })
    @IsEnum(Department)
    @IsNotEmpty()
    course_department: Department;

    @ApiProperty({ enum: Level })
    @IsEnum(Level)
    @IsNotEmpty()
    course_level: Level;

    @ApiPropertyOptional({ example: 0, description: 'Minimum credit hours required' })
    @IsNumber()
    @IsOptional()
    course_min_credit_hours?: number;

    @ApiPropertyOptional({ example: 0, description: 'Minimum GPA required' })
    @IsNumber()
    @IsOptional()
    course_min_gpa?: number;
}