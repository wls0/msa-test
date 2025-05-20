import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap({
        next: () => {
          this.logger.info({
            type: 'request',
            id: request.id,
            method: request.method,
            url: request.url,
            ip: request.ip,
            headers: request.headers,
            body: request.body,
            query: request.query,
            params: request.params,
          });
        },
      }),
      tap({
        next: (data) => {
          this.logger.info({
            type: 'response',
            id: response.id,
            method: response.method,
            url: response.url,
            ip: response.ip,
            headers: response.headers,
            body: response.body,
            query: response.query,
            params: response.params,
            data,
          });
        },
      }),
      tap({
        error: (err: Error): void => {
          this.logger.error({
            id: request.id,
            method: request.method,
            url: request.url,
            ip: request.ip,
            headers: request.headers,
            body: request.body,
            query: request.query,
            params: request.params,
            error: err,
          });
        },
      }),
    );
  }
}
