import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule} from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { StudentsModule } from '@edumatrix/students';
import { AuthMiddlerware } from '@edumatrix/shared';
import { GraphQLValidationExceptionFilter } from '@edumatrix/core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      sortSchema: true,
      formatError: (error) => {
        const originalError = error.extensions?.originalError as any;
        
        if (originalError?.statusCode === 400) {
          return {
            message: originalError.message || 'Validation failed',
            extensions: {
              code: 'BAD_USER_INPUT',
              errors: originalError.errors,
            },
          };
        }

        return error;
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2025',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    ApiModule,
    StudentsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GraphQLValidationExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlerware)
      .forRoutes('*');
  }
}
