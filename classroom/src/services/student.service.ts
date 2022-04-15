import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
export interface CreateStudentParams {
  authId: string;
}
@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create({ authId }: CreateStudentParams) {
    const student = await this.prisma.student.findUnique({
      where: {
        authUserId: authId,
      },
    });
    if (student) {
      throw new Error('Student alread exists!');
    }
    return await this.prisma.student.create({
      data: {
        authUserId: authId,
      },
    });
  }

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
