import { Controller, Post, Body, Param, UseGuards, Get } from "@nestjs/common";
import { InstructorService } from "./instructor.service";
import { AuthRolesGuard } from "../users/guards/auth-role.guard";
import { Roles } from "../users/decorators/user-role.decorator";
import { Role } from "../../utils/enum";
import { CreateInstructorDto } from "./dtos/create-instructor.dto";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import * as type from '../../utils/type';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Instructors')
@Controller('api/instructors')
export class InstructorController {
    constructor(private readonly instructorService: InstructorService) { }

    @Post()
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new instructor (Admin only)' })
    @ApiResponse({ status: 201, description: 'Instructor successfully created' })
    create(@Body() createInstructorDto: CreateInstructorDto, @CurrentUser() user: type.JWTPayloadType) {
        return this.instructorService.createInstructor(createInstructorDto, user.sub);
    }

    @Get('count')
    @ApiOperation({ summary: 'Get total number of instructors' })
    async getNumberOfInstructors() {
        return this.instructorService.getNumberOfInstructors();
    }
}