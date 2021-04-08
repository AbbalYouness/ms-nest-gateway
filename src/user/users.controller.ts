import {
  Controller,
  Post,
  Body,
  Inject,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';

import { CreateUserResponseDto } from './dto/create-user-response.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { IServiceUserCreateResponse } from './interfaces/service-user-create-response.interface';

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy;

  @ApiCreatedResponse({
    type: CreateUserResponseDto,
  })
  @Post()
  public async createUser(
    @Body() userRequest: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    const createUserResponse: IServiceUserCreateResponse = await this.userServiceClient
      .send('create_user', userRequest)
      .toPromise();

    if (createUserResponse.status !== HttpStatus.CREATED) {
      throw new HttpException(
        {
          message: createUserResponse.message,
          data: null,
          errors: createUserResponse.errors,
        },
        createUserResponse.status,
      );
    }

    return {
      message: createUserResponse.message,
      data: {
        user: createUserResponse.user,
      },
      errors: null,
    };
  }
}
