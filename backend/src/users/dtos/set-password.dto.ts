import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetPasswordDto {
  @ApiProperty({ example: 'newpassword123', description: 'New password for the user' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({ example: 'newpassword123', description: 'Confirm new password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  confirmPassword: string;
}
