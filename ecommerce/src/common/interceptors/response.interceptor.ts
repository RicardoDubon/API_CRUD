import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: HttpStatus.OK,
        message: 'Success',
        data,
      })),
      catchError((error) => {
        if (error instanceof HttpException) {
          throw error;
        } else {
          throw new HttpException(
            {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              message: 'Internal Server Error',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }),
    );
  }
}
