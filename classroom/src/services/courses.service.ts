import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';
interface CreateCourseParams {
  title: string;
}

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.course.findMany();
  }

  async findById(courseId: string) {
    return await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
  }

  async createCourse({ title }: CreateCourseParams) {
    const slug = slugify(title, { lower: true });
    const existCourse = await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
    if (existCourse) {
      throw new Error('Course alread exists');
    }
    return await this.prisma.course.create({
      data: {
        title,
        slug,
      },
    });
  }
}
