import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Enrollment } from "./entities/enrollment.entity";
import { CoursesModule } from "../courses/courses.module";
import { StudentsModule } from "../students/students.module";
import { JwtModule } from "@nestjs/jwt";
import { EnrollmentService } from "./enrollments.service";
import { EnrollmentController } from "./enrollments.controller";
import { UsersModule } from "../users/users.module";
import { GradesModule } from "../grades/grades.module";

@Module({
    imports: [
        UsersModule,
        forwardRef(() => CoursesModule),
        forwardRef(() => StudentsModule),
        forwardRef(() => GradesModule),
        TypeOrmModule.forFeature([Enrollment]),
        JwtModule,
    ],
    controllers: [EnrollmentController],
    providers: [EnrollmentService],
    exports: [EnrollmentService, TypeOrmModule],
})
export class EnrollmentsModule { }