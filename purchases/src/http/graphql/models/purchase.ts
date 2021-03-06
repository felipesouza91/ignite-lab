import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from './Product';
enum PurchaseStatus {
  PENDING = 'PENDING',
  APROVED = 'APROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available Purchase Status',
});

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;
  @Field(() => Product)
  product: Product;

  productId: string;

  @Field(() => Date)
  createdAt: Date;
}
