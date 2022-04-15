import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CourseService } from 'src/services/courses.service';
import { EnrollmentService } from 'src/services/enrollment.service';
import { StudentService } from 'src/services/student.service';
export interface PurchasesCreated {
  custumer: Custumer;
  product: Product;
}

export interface Custumer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

@Controller()
export class PurchasesController {
  constructor(
    private studentService: StudentService,
    private coursesService: CourseService,
    private enrollmentService: EnrollmentService,
  ) {}
  @EventPattern('purchase.new-purchase')
  async purchaseCreated(@Payload('value') payload: PurchasesCreated) {
    let student = await this.studentService.getStudentByAuthId(
      payload.custumer.authUserId,
    );
    if (!student) {
      student = await this.studentService.create({
        authId: payload.custumer.authUserId,
      });
    }
    let course = await this.coursesService.findBySlug(payload.product.slug);
    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
        slug: payload.product.slug,
      });
    }
    await this.enrollmentService.createEnrollment({
      studentId: student.id,
      courseId: course.id,
    });
  }
}
