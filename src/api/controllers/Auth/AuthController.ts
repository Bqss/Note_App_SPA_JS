import { JsonController, Body, Post, Res, Controller } from 'routing-controllers';
import { Service } from 'typedi';
import { LoginRequest } from '@api/requests/Auth/LoginRequest';
import { AuthService } from '@base/api/services/Auth/AuthService';
import { ControllerBase } from '@base/infrastructure/abstracts/ControllerBase';
import { OpenAPI } from 'routing-controllers-openapi';
import { Response } from 'express';

@Service()
@OpenAPI({
  tags: ['Auth'],
})
@Controller('/auth')
export class AuthController extends ControllerBase {
  public constructor(private loginService: AuthService) {
    super();
  }
  @Post('/login')
  public async login(@Body() user: LoginRequest, @Res() res: Response) {
    const payload  = await this.loginService.login(user) as any;
    res.cookie('token', payload.access_token, { httpOnly: true });
    return res.send({
      success: true, 
      message: 'Login successfully',
      data: payload,
    });
  }


  @Post('/logout')
  public async logout(@Res() res: Response){
    res.clearCookie('token');
    return res.send({
      status: 200,
      message: 'Logout successfully',
    });
  }
}
