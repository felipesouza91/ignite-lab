import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { DatabaseModule } from 'src/database/database.module';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { StudentService } from 'src/services/student.service';
import { EnrollmentService } from 'src/services/enrollment.service';
import { CourseService } from 'src/services/courses.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
    }),
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  providers: [
    StudentsResolver,
    EnrollmentsResolver,
    CoursesResolver,
    StudentService,
    EnrollmentService,
    CourseService,
  ],
})
export class HttpModule {}
