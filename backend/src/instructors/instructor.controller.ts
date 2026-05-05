import { Controller, Post, Body, Param, UseGuards, Get } from "@nestjs/common";
import { InstructorService } from "./instructor.service";
import { AuthRolesGuard } from "../users/guards/auth-role.guard";
import { Roles } from "../users/decorators/user-role.decorator";
import { Role } from "../../utils/enum";
import { CreateInstructorDto } from "./dtos/create-instructor.dto";
import { CurrentUser } from "../users/decorators/current-user.decorator";
import * as type from '../../utils/type';


@Controller('api/instructors')
export class InstructorController {
    constructor(private readonly instructorService: InstructorService) { }

    // POST: ~/api/instructors
    @Post()
    @UseGuards(AuthRolesGuard)
    @Roles(Role.ADMIN)
    create(@Body() createInstructorDto: CreateInstructorDto, @CurrentUser() user: type.JWTPayloadType) {
        return this.instructorService.createInstructor(createInstructorDto, user.sub);
    }

    // GET: ~/api/instructors/count
    @Get('count')
    async getNumberOfInstructors() {
        return this.instructorService.getNumberOfInstructors();
    }
}