import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CourseService } from 'src/services/courses.service';
import { EnrollmentService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';
import { CreateCourseInput } from '../inputs/create-course-input';
import { Course } from '../models/course';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private courseService: CourseService,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
  ) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async courses() {
    return await this.courseService.findAll();
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(
    @Args('courseId') courseId: string,
    @CurrentUser() user: AuthUser,
  ) {
    const student = await this.studentService.getStudentByAuthId(user.sub);
    if (!student) {
      throw new Error('Student not found');
    }
    const enrollmentExists =
      await this.enrollmentService.getByCourseAndStudentId({
        courseId,
        userId: student.id,
      });
    if (!enrollmentExists) {
      throw new UnauthorizedException();
    }
    return await this.courseService.findById(courseId);
  }

  @Mutation(() => Course)
  async createCourse(@Args('data') { title }: CreateCourseInput) {
    return await this.courseService.createCourse({ title });
  }
}
