import { Semester } from "../../../utils/enum";
import { IsString, IsNumber, IsEnum, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEnrollmentDto {
    @ApiProperty({ example: '20230001', description: 'Student unique code' })
    @IsString()
    @IsNotEmpty()
    student_code: string;

    @ApiProperty({ example: 'CS101', description: 'Course unique code' })
    @IsString()
    @IsNotEmpty()
    course_code: string;
    
    @ApiProperty({ example: 2024, description: 'Academic year' })
    @IsNumber()
    @IsNotEmpty()
    year: number;

    @ApiProperty({ enum: Semester })
    @IsEnum(Semester)
    @IsNotEmpty()
    semester: Semester;
}