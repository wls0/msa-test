import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
@Injectable()
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const error =
      exception instanceof HttpException
        ? (exception.getResponse() as string | { error: string; message: string | string[] })
        : 'Internal server error';

    // if (status >= 500) {
    //   throw exception;
    // }

    if (typeof error === 'string') {
      response.status(status).json({
        code: status,
        body: null,
        message: error,
        method: request.method,
        path: request.url,
      });
    } else {
      response.status(status).json({
        code: status,
        body: null,
        message: error.message,
        method: request.method,
        path: request.url,
      });
    }
  }
}
