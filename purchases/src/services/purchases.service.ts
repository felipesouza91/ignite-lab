import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
interface CreateProductParams {
  productId: string;
  custumerId: string;
}
@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) {}

  async listAllPurchases() {
    return await this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllFromCustomer(customerId: string) {
    return await this.prisma.purchase.findMany({
      where: {
        custumerId: customerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async createPurchase({ custumerId, productId }: CreateProductParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    return await this.prisma.purchase.create({
      data: {
        custumerId,
        productId,
      },
    });
  }
}
