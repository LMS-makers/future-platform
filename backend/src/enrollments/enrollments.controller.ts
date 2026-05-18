import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete } from "@nestjs/common";
import { EnrollmentService } from "./enrollments.service";
import { CreateEnrollmentDto } from "./dtos/create-enrollment.dto";
import { AuthRolesGuard } from "../users/guards/auth-role.guard";
import { Roles } from "../users/decorators/user-role.decorator";
import { Role } from "../../utils/enum";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import * as type from "../../utils/type";
import { UpdateEnrollmentDto } from "./dtos/update-enrollment.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Enrollments')
@Controller('api/enrollments')
export class EnrollmentController {
    constructor(
        private readonly enrollmentService: EnrollmentService,
    ) { }

    @Post()
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new course enrollment (Admin only)' })
    @ApiResponse({ status: 201, description: 'Enrollment successfully created' })
    async createEnrollment(
        @Body() createEnrollmentDto: CreateEnrollmentDto
    ) {
        return this.enrollmentService.createEnrollment(createEnrollmentDto);
    }

    @Get(':id')
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get enrollment by ID (Admin only)' })
    async getEnrollmentById(@Param('id') id: string) {
        return this.enrollmentService.getEnrollmentById(id);
    }

    @Get('student/:student_id')
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all enrollments for a specific student (Admin only)' })
    async getStudentEnrollments(@Param('student_id') student_id: string) {
        return this.enrollmentService.getStudentEnrollments(student_id);
    }

    @Get('course/:course_id')
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all enrollments for a specific course (Admin only)' })
    async getCourseEnrollments(@Param('course_id') course_id: string) {
        return this.enrollmentService.getCourseEnrollments(course_id);
    }

    @Put(':id')
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update enrollment status (Admin only)' })
    async updateEnrollmentStatus(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto) {
        return this.enrollmentService.updateEnrollmentStatus(id, dto.status);
    }

    @Delete(':id')
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete an enrollment (Admin only)' })
    async deleteEnrollment(@Param('id') id: string) {
        return this.enrollmentService.deleteEnrollment(id);
    }
}