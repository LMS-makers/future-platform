import { IsEnum, IsOptional, IsString } from "class-validator";
import { EnrollmentStatus } from "../../../utils/enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateEnrollmentDto {
    @ApiPropertyOptional({ enum: EnrollmentStatus })
    @IsEnum(EnrollmentStatus)
    @IsOptional()
    status: EnrollmentStatus;

    @ApiPropertyOptional({ example: '2024', description: 'Academic year' })
    @IsString()
    @IsOptional()
    year: string;

    @ApiPropertyOptional({ example: 'First', description: 'Semester' })
    @IsString()
    @IsOptional()
    semester: string;
}