import { IsEnum, IsOptional, IsString, IsNumber } from "class-validator";
import { Department, CreditHours, Semester, Level } from "../../../utils/enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateCourseDto {
    @ApiPropertyOptional({ example: 'CS101', description: 'Unique course code' })
    @IsString()
    @IsOptional()
    course_code: string;

    @ApiPropertyOptional({ example: 'Introduction to Computer Science', description: 'Name of the course' })
    @IsString()
    @IsOptional()
    course_name: string;

    @ApiPropertyOptional({ example: 'Fundamental concepts of CS', description: 'Detailed description' })
    @IsString()
    @IsOptional()
    course_description: string;

    @ApiPropertyOptional({ enum: CreditHours })
    @IsEnum(CreditHours)
    @IsOptional()
    course_credit_hours: CreditHours;

    @ApiPropertyOptional({ enum: Semester })
    @IsEnum(Semester)
    @IsOptional()
    course_semester: Semester;

    @ApiPropertyOptional({ enum: Department })
    @IsEnum(Department)
    @IsOptional()
    course_department: Department;

    @ApiPropertyOptional({ enum: Level })
    @IsEnum(Level)
    @IsOptional()
    course_level: Level;

    @ApiPropertyOptional({ example: 0, description: 'Minimum credit hours required' })
    @IsNumber()
    @IsOptional()
    course_min_credit_hours?: number;

    @ApiPropertyOptional({ example: 0, description: 'Minimum GPA required' })
    @IsNumber()
    @IsOptional()
    min_gpa?: number;
}