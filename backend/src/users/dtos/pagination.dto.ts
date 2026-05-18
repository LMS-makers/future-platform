import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class PaginationDto {
    @ApiProperty({ default: 1 })
    @IsNumber()
    @IsOptional()
    page?: number;

    @ApiProperty({ default: 10 })
    @IsNumber()
    @IsOptional()
    limit?: number;
}