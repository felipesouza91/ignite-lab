import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
interface GetByCourseAndStudentIdParams {
  courseId: string;
  userId: string;
}

interface CreateEnrollmentParams {
  studentId: string;
  courseId: string;
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

  async createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    return await this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
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
