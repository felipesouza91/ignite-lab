import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
interface GetByCourseAndStudentIdParams {
  courseId: string;
  userId: string;
}
@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getByCourseAndStudentId({
    courseId,
    userId,
  }: GetByCourseAndStudentIdParams) {
    return await this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId: userId,
        canceledAt: null,
      },
    });
  }

  async findByStudentId(studentId: string) {
    return await this.prisma.enrollment.findMany({
      where: {
        canceledAt: null,
        studentId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
