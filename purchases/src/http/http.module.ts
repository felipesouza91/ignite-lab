import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerService } from 'src/services/customer.service';
import { ProductService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
    }),
    ConfigModule.forRoot(),
    MessagingModule,
    DatabaseModule,
  ],
  providers: [
    ProductsResolver,
    ProductService,
    PurchasesResolver,
    PurchasesService,
    CustomerService,
    CustomersResolver,
  ],
})
export class HttpModule {}
