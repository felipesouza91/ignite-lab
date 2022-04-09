import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductService } from 'src/services/products.service';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/Product';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductService) {}

  @Query(() => [Product])
  async products() {
    return await this.productsService.listAllProducts();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  async createProduct(@Args('data') data: CreateProductInput) {
    return await this.productsService.createProduct(data);
  }
}
