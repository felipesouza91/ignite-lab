import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
interface CreateCustomerParams {
  authUserId: string;
}
@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}

  async getCustomerByAuthUserId(auth0Id: string) {
    return this.prisma.custumer.findUnique({
      where: {
        authUserId: auth0Id,
      },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    const customer = await this.prisma.custumer.findUnique({
      where: {
        authUserId,
      },
    });
    if (customer) {
      throw new Error('Customer alread exists!');
    }
    return this.prisma.custumer.create({
      data: {
        authUserId,
      },
    });
  }
}
