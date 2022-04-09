import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomerService } from 'src/services/customer.service';
import { ProductService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Product } from '../models/Product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productService: ProductService,
    private custumerService: CustomerService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  async listAllPurchases() {
    return await this.purchasesService.listAllPurchases();
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') { productId }: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    console.log(user.sub);
    let customer = await this.custumerService.getCustomerByAuthUserId(user.sub);
    if (!customer) {
      customer = await this.custumerService.createCustomer({
        authUserId: user.sub,
      });
    }
    return await this.purchasesService.createPurchase({
      productId,
      custumerId: customer.id,
    });
  }

  @ResolveField(() => Product)
  async product(@Parent() purchase: Purchase) {
    return await this.productService.listById(purchase.productId);
  }
}
