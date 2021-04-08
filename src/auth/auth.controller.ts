import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { AuthUserDto } from './dto/auth-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy;

  @Post()
  async login(@Body() userRequest: AuthUserDto) {
    try {
      return await this.authServiceClient
        .send('auth_user', userRequest)
        .toPromise();
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          data: null,
          errors: error,
        },
        error.status,
      );
    }
  }
}
