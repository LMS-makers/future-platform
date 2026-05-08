import { IsNumber, IsOptional, Max, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateGradeDto {
    @ApiPropertyOptional({ example: 20, description: 'Coursework grade (0-100)' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    coursework: number;

    @ApiPropertyOptional({ example: 15, description: 'Midterm grade (0-100)' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    midterm: number;

    @ApiPropertyOptional({ example: 50, description: 'Final exam grade (0-100)' })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    final: number;
}