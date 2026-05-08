import { Controller, Post, Body, UseGuards, Param, Get, Put, Patch } from "@nestjs/common";
import { CoursesService } from "./courses.service";
import { CreateCourseDto } from "./dtos/create-course.dto";
import { UpdateCourseDto } from "./dtos/update-course.dto";
import { AuthRolesGuard } from "../users/guards/auth-role.guard";
import { Roles } from "../users/decorators/user-role.decorator";
import { Role } from "../../utils/enum";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import * as type from '../../utils/type';
import { AddPrerequisiteDto } from "./dtos/add-prerequisite.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Courses')
@Controller('api/courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) { }

    @Get('count')
    @ApiOperation({ summary: 'Get total number of courses' })
    async getNumberOfCourses() {
        return this.coursesService.getNumberOfCourses();
    }

    @Post()
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new course (Admin only)' })
    @ApiResponse({ status: 201, description: 'Course successfully created' })
    create(
        @Body() createCourseDto: CreateCourseDto,
        @CurrentUser() user: type.JWTPayloadType
    ) {
        return this.coursesService.createCourse(createCourseDto, user.sub);
    }

    @Post(':course_id/prerequisite')
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Add a prerequisite to a course (Admin only)' })
    addPrerequisite(
        @Param('course_id') course_id: string,
        @Body() prerequisiteId: AddPrerequisiteDto,
        @CurrentUser() user: type.JWTPayloadType
    ) {
        return this.coursesService.addPrerequisite(course_id, prerequisiteId, user.sub);
    }

    @Get()
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all courses (Admin only)' })
    async getAllCourses() {
        return this.coursesService.getAllCourses();
    }

    @Get(':course_id')
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get course by ID (Admin only)' })
    async getCourse(@Param('course_id') course_id: string) {
        return this.coursesService.getCourse(course_id);
    }

    @Patch(':course_id')
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a course (Admin only)' })
    async updateCourse(
        @Param('course_id') course_id: string,
        @Body() updateCourseDto: UpdateCourseDto,
        @CurrentUser() user: type.JWTPayloadType
    ) {
        return this.coursesService.updateCourse(course_id, updateCourseDto, user.sub);
    }
}