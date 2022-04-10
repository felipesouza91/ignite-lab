import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getStudentByAuthId(authId: string) {
    return await this.prisma.student.findUnique({
      where: {
        authUserId: authId,
      },
    });
  }

  async findAll() {
    return await this.prisma.student.findMany();
  }

  async findById(studentId: string) {
    return await this.prisma.student.findUnique({
      where: {
        id: studentId,
      },
    });
  }
}
