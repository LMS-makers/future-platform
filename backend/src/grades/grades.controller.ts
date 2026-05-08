import { Body, Controller, Get, HttpCode, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { UpdateGradeDto } from "./dtos/update-grade.dto";
import { GradesService } from "./grades.service";
import { AuthRolesGuard } from "../users/guards/auth-role.guard";
import { Roles } from "../users/decorators/user-role.decorator";
import { Role } from "../../utils/enum";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Grades')
@Controller('api/grades')
export class GradesController {
    constructor(
        private readonly gradesService: GradesService,
    ) { }

    @Patch(':enrollmentId')
    @HttpCode(200)
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN, Role.INSTRUCTOR, Role.CONTROLL_MEMBER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update or insert grades for a specific enrollment' })
    @ApiResponse({ status: 200, description: 'Grade successfully updated' })
    public async updateGPA(
        @Param('enrollmentId') enrollmentId: string,
        @Body() dto: UpdateGradeDto,
    ) {
        return this.gradesService.upsertGrade(enrollmentId, dto);
    }

    @Patch(':enrollmentId/finalize')
    @HttpCode(200)
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN, Role.CONTROLL_MEMBER)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Finalize a grade (Admin/Control Member only)' })
    @ApiResponse({ status: 200, description: 'Grade successfully finalized' })
    public async finalizeGrade(
        @Param('enrollmentId') enrollmentId: string,
    ) {
        return this.gradesService.finalizeGrade(enrollmentId);
    }

    @Get('')
    @HttpCode(200)
    @ApiOperation({ summary: 'Calculate GPA for a student in a specific year and semester' })
    @ApiQuery({ name: 'studentId', required: true })
    @ApiQuery({ name: 'year', type: Number, required: true })
    @ApiQuery({ name: 'semester', type: Number, required: true })
    public async getGPA(
        @Query('studentId') studentId: string,
        @Query('year') year: number,
        @Query('semester') semester: number,
    ) {
        return this.gradesService.calculateGPA(studentId, year, semester);
    }

    @Get('cgpa')
    @HttpCode(200)
    @ApiOperation({ summary: 'Calculate cumulative GPA (CGPA) for a student' })
    @ApiQuery({ name: 'studentId', required: true })
    public async getCGPA(
        @Query('studentId') studentId: string,
    ) {
        return this.gradesService.calculateCGPA(studentId);
    }
}