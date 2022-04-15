import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { PurchasesController } from './controller/purchases.controller';

@Module({
  imports: [ServicesModule],
  controllers: [PurchasesController],
})
export class MessagingModule {}
