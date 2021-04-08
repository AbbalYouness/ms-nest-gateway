import { ApiProperty } from '@nestjs/swagger';
import { IUser } from '../interfaces/user.interface';

export class CreateUserResponseDto {
  @ApiProperty({ example: 'create_user_success' })
  message: string;

  @ApiProperty({
    example: {
      user: {
        id: '5d987c3bfb881ec86b476bcc',
        email: 'test@denrox.com',
      },
    },
    nullable: true,
  })
  data: {
    user: IUser;
  };

  @ApiProperty({ example: null, nullable: true })
  errors: { [key: string]: any };
}
