import { ExpressErrorMiddlewareInterface, Middleware, HttpError } from 'routing-controllers';
import * as express from 'express';
import { Service } from 'typedi';
import { ValidationError } from 'class-validator';
import { env } from '@base/utils/env';

@Service()
@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  public error(error: any, _req: express.Request, res: express.Response, _next: express.NextFunction) {
    const responseObject = {} as any;
    responseObject.success = false;

    // Status code
    if (error instanceof HttpError && error.httpCode) {
      responseObject.status = error.httpCode;
      res.status(error.httpCode);
    } else {
      responseObject.status = 500;
      if(env("NODE_ENV") !== 'production'){
        console.error(error);
      }
      res.status(500);
    }

    // Message
    responseObject.message = error.message;

    // Class validator handle errors
    if (responseObject.status == 400) {
      let validatorErrors = {} as any;
      if (typeof error === 'object' && error.hasOwnProperty('errors')) {
        error.errors.forEach((element: ValidationError, i:number) => {
          if (element.property && element.constraints) {
            validatorErrors[element.property] = Object.values(element.constraints);
          }
        });
      }
      responseObject.errors = validatorErrors;
    }

    // Append stack
    if (error.stack && process.env.NODE_ENV === 'development' && responseObject.status == 500) {
      responseObject.stack = error.stack;
    }

    // Final response
    res.json(responseObject);
  }
}
