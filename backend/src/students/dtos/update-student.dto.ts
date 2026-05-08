import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { Semester } from "../../../utils/enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateStudentDto {
    @ApiPropertyOptional({ example: 3.6, description: 'Cumulative GPA' })
    @IsNumber()
    @IsOptional()
    cgpa?: number;

    @ApiPropertyOptional({ example: 3.5, description: 'Current GPA' })
    @IsNumber()
    @IsOptional()
    gpa?: number;

    @ApiPropertyOptional({ example: 2, description: 'Current academic year' })
    @IsNumber()
    @IsOptional()
    year?: number;

    @ApiPropertyOptional({ enum: Semester })
    @IsEnum(Semester)
    @IsOptional()
    semester?: Semester;
}