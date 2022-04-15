import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Parent,
  ResolveField,
  ResolveReference,
} from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomerService } from 'src/services/customer.service';
import { PurchasesService } from 'src/services/purchases.service';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customerService: CustomerService,
    private purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: AuthUser) {
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  async purchases(@Parent() customer: Customer) {
    return await this.purchasesService.findAllFromCustomer(customer.id);
  }

  @ResolveReference()
  async resolveReference(reference: { authUserId: string }) {
    return await this.customerService.getCustomerByAuthUserId(
      reference.authUserId,
    );
  }
}
