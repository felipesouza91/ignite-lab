import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';
interface CreateCourseParams {
  title: string;
  slug?: string;
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

  async findBySlug(slug: string) {
    return await this.prisma.course.findUnique({
      where: {
        slug,
      },
    });
  }

  async createCourse({
    title,
    slug = slugify(title, { lower: true }),
  }: CreateCourseParams) {
    const existCourse = await this.findBySlug(slug);
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
