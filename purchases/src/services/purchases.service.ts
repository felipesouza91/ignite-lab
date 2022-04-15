import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { KafkaService } from 'src/messaging/kafka.service';
interface CreateProductParams {
  productId: string;
  custumerId: string;
}
@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService,
    private kafkaService: KafkaService,
  ) {}

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
    const customer = await this.prisma.custumer.findUnique({
      where: {
        id: custumerId,
      },
    });
    if (!product) {
      throw new Error('Product not found');
    }
    const purchase = await this.prisma.purchase.create({
      data: {
        custumerId,
        productId,
      },
    });
    this.kafkaService.emit('purchase.new-purchase', {
      custumer: {
        authUserId: customer.authUserId,
      },
      product: {
        id: product.id,
        title: product.title,
        slug: product.slug,
      },
    });
    return purchase;
  }
}
