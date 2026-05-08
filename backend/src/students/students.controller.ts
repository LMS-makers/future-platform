import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guards/auth.guard';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentsService } from './students.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import * as type from '../../utils/type';
import { AuthRolesGuard } from '../users/guards/auth-role.guard';
import { Roles } from '../users/decorators/user-role.decorator';
import { Department, Gender, Level, Role } from '../../utils/enum';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Students')
@Controller('api/students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) {}

  @Get('count')
  @ApiOperation({ summary: 'Get total number of students' })
  async getNumberOfStudents() {
    return this.studentsService.getNumberOfStudents();
  }

  @Post('create')
  @UseGuards(AuthRolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new student (Admin only)' })
  @ApiResponse({ status: 201, description: 'Student successfully created' })
  public async createStudent(
    @Body() createStudentDto: CreateStudentDto,
    @CurrentUser() user: type.JWTPayloadType,
  ) {
    return this.studentsService.createStudent(createStudentDto, user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Get all students with optional filters' })
  @ApiQuery({ name: 'level', enum: Level, required: false })
  @ApiQuery({ name: 'department', enum: Department, required: false })
  @ApiQuery({ name: 'gender', enum: Gender, required: false })
  async getAllStudents(
    @Query('level') level?: Level,
    @Query('department') department?: Department,
    @Query('gender') gender?: Gender
  ) {
    return this.studentsService.getAllStudents(level, department, gender);
  }

  @Get('dashboard')
  @UseGuards(AuthRolesGuard)
  @Roles(Role.STUDENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current student dashboard data' })
  async studentDashboard(@CurrentUser() payload: type.JWTPayloadType) {
    return this.studentsService.studentDashboard(payload.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get student by ID' })
  async getStudentById(@Param('id') id: string) {
    return this.studentsService.getStudentById(id);
  }

  @Get('code/:student_code')
  @ApiOperation({ summary: 'Get student by student code' })
  async getStudentByCode(@Param('student_code') student_code: string) {
    return this.studentsService.getStudentByCode(student_code);
  }
}
