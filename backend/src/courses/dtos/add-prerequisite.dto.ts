import { IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddPrerequisiteDto {
  @ApiProperty({ example: 'uuid-of-prerequisite-course', description: 'ID of the prerequisite course' })
  @IsUUID()
  prerequisiteId: string;
}