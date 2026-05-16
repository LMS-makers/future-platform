import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

import {
  Department,
  Semester,
  Level,
  HighSchoolType,
} from '../../../utils/enum';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { UpdateUserDto } from '../../users/dtos/update-user.dto';

export class UpdateStudentDto {
  @ApiPropertyOptional({ type: UpdateUserDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user?: UpdateUserDto;

  @ApiPropertyOptional({
    example: 3.6,
    description: 'Cumulative GPA',
  })
  @IsNumber()
  @Min(0)
  @Max(4)
  @IsOptional()
  cgpa?: number;

  @ApiPropertyOptional({
    example: 3.5,
    description: 'Current GPA',
  })
  @IsNumber()
  @Min(0)
  @Max(4)
  @IsOptional()
  gpa?: number;

  @ApiPropertyOptional({ enum: Level })
  @IsEnum(Level)
  @IsOptional()
  level?: Level;

  @ApiPropertyOptional({ enum: Semester })
  @IsEnum(Semester)
  @IsOptional()
  semester?: Semester;

  @ApiPropertyOptional({ enum: Department })
  @IsEnum(Department)
  @IsOptional()
  department?: Department;

  @ApiPropertyOptional({
    example: 'Note about the student',
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({
    example: 95.5,
    description: 'High school score',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  high_school_score?: number;

  @ApiPropertyOptional({
    example: 410,
    description: 'High school degree',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  high_school_degree?: number;

  @ApiPropertyOptional({
    example: 2022,
    description: 'High school year',
  })
  @IsNumber()
  @Min(1900)
  @IsOptional()
  high_school_year?: number;

  @ApiPropertyOptional({ enum: HighSchoolType })
  @IsEnum(HighSchoolType)
  @IsOptional()
  high_school_type?: HighSchoolType;

  @ApiPropertyOptional({
    example: '2022-01-01',
    description: 'Enrollment date',
  })
  @IsDateString()
  @IsOptional()
  enrollment_date?: Date;
}