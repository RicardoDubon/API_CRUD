import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let message = exception.message;
    if (exception instanceof HttpException && exception.getResponse()) {
      const response = exception.getResponse();
      if (typeof response === 'object' && response['message']) {
        message = response['message'];
      }
    }

    response.status(status).json({
      statusCode: status,
      error: exception.name,
      message: Array.isArray(message) ? message : [message],
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
