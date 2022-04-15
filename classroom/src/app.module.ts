import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { MessagingModule } from './messaging/messaging.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [DatabaseModule, HttpModule, MessagingModule, ServicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
