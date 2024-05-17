import { Service } from 'typedi';
import { JsonController, Body, Post, Res } from 'routing-controllers';
import { RegisterRequest } from '@api/requests/Auth/RegisterRequest';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';
import { RegisterService } from '@base/api/services/Auth/RegisterService';
import { Response } from 'express';

@Service()
@OpenAPI({
  tags: ['Auth'],
})
@JsonController('/register')
export class RegisterController extends ControllerBase {
  public constructor(private registerService: RegisterService) {
    super();
  }

  @Post()
  public async register(@Body() user: RegisterRequest, @Res() res : Response) {
    await this.registerService.register(user);
    return res.send({
      success: true,
      message: 'User registered successfully'
    });
  }
}

