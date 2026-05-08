import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { AssignCourseService } from "./assign.service";
import { AuthRolesGuard } from "../users/guards/auth-role.guard";
import { Roles } from "../users/decorators/user-role.decorator";
import { Role } from "../../utils/enum";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import * as type from '../../utils/type';
import { AssignCourseDto } from "./dtos/assign-course.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Assign Course')
@Controller('api/assign-course')
export class AssignCourseController {
    constructor(private readonly assignCourseService: AssignCourseService) { }

    @Post()
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Assign a course to an instructor (Admin only)' })
    @ApiResponse({ status: 201, description: 'Course successfully assigned' })
    assignCourse(@Body() dto: AssignCourseDto, @CurrentUser() user: type.JWTPayloadType) {
        return this.assignCourseService.assignCourse(dto, user.sub);
    }
}