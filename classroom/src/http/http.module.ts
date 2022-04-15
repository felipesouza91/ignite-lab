import {
  ApolloDriver,
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';

import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloFederationDriver,
    }),
    ConfigModule.forRoot(),
    ServicesModule,
  ],
  providers: [StudentsResolver, EnrollmentsResolver, CoursesResolver],
})
export class HttpModule {}
