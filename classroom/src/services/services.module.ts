import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CourseService } from './courses.service';
import { EnrollmentService } from './enrollment.service';
import { StudentService } from './student.service';

@Module({
  imports: [DatabaseModule],
  providers: [StudentService, EnrollmentService, CourseService],
  exports: [StudentService, EnrollmentService, CourseService],
})
export class ServicesModule {}
