import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import slugify from 'slugify';
import { Product } from '@prisma/client';
interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async listAllProducts() {
    return await this.prisma.product.findMany();
  }

  async listById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct({ title }: CreateProductParams): Promise<Product> {
    const slug = slugify(title, { lower: true });
    const slugExists = await this.prisma.product.findUnique({
      where: {
        slug,
      },
    });
    if (slugExists) {
      throw new Error('Another product with same slug already exists.');
    }
    return this.prisma.product.create({
      data: {
        title,
        slug,
      },
    });
  }
}
