import { Semester } from "../../../utils/enum";
import { IsString, IsNumber, IsEnum, IsNotEmpty } from "class-validator";

export class CreateEnrollmentDto {
    // @IsString()
    // @IsNotEmpty()
    // studentId: string;

    @IsString()
    @IsNotEmpty()
    student_code: string;

    // @IsString()
    // @IsNotEmpty()
    // course_id: string;

    @IsString()
    @IsNotEmpty()
    course_code: string;
    
    @IsNumber()
    @IsNotEmpty()
    year: number;

    @IsEnum(Semester)
    @IsNotEmpty()
    semester: Semester;
}