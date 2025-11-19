
import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch(BadRequestException)
export class GraphQLValidationExceptionFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const response = exception.getResponse() as any;

    // Format validation errors
    const validationErrors = response.errors || response;

    return new GraphQLError('Validation failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        validationErrors: validationErrors,
        http: {
          status: 400,
        },
      },
    });
  }
}