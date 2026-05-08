import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InitLoginDto {
  @ApiProperty({ example: '29001010101012', description: 'National ID (14 digits)' })
  @IsNotEmpty()
  @IsString()
  @MinLength(14)
  @MaxLength(14)
  national_id: string;
}
