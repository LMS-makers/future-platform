import { IsNotEmpty, IsString, IsInt, IsEnum } from 'class-validator';
import { Semester } from '../../../utils/enum';
import { ApiProperty } from '@nestjs/swagger';

export class AssignCourseDto {
  @ApiProperty({ example: 'uuid-instructor', description: 'ID of the instructor' })
  @IsString()
  @IsNotEmpty()
  instructor_id: string;

  @ApiProperty({ example: 'uuid-course', description: 'ID of the course' })
  @IsString()
  @IsNotEmpty()
  course_id: string;

  @ApiProperty({ example: 2024, description: 'Academic year' })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ enum: Semester })
  @IsEnum(Semester)
  @IsNotEmpty()
  semester: Semester;
}