import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InstructorCourse } from "./entities/assign-course.entity";
import { Repository } from "typeorm";
import { AssignCourseDto } from "./dtos/assign-course.dto";
import { InstructorService } from "../instructors/instructor.service";
import { CoursesService } from "../courses/courses.service";

@Injectable()
export class AssignCourseService {
    constructor(
        @InjectRepository(InstructorCourse)
        private readonly instructorCourseRepository: Repository<InstructorCourse>,
        private readonly instructorService: InstructorService,
        private readonly coursesService: CoursesService,
    ) { }

    public async assignCourse(dto: AssignCourseDto) {
        await this.instructorService.getInstructorById(dto.instructor_id);
        await this.coursesService.getCourse(dto.course_id);

        const existing = await this.instructorCourseRepository.findOne({
            where: {
                instructor: { id: dto.instructor_id },
                course: { id: dto.course_id },
                year: dto.year,
                semester: dto.semester,
            },
        });

        if (existing) {
            throw new BadRequestException('Course already assigned to this instructor');
        }

        const instructorCourse = this.instructorCourseRepository.create({
            instructor: { id: dto.instructor_id },
            course: { id: dto.course_id },
            year: dto.year,
            semester: dto.semester,
        });

        return await this.instructorCourseRepository.save(instructorCourse);
    }
}