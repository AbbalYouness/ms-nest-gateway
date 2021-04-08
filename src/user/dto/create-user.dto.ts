import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'test1@denrox.com',
  })
  email: string;

  @ApiProperty({
    minLength: 5,
    maxLength: 64,
    example: 'test11',
  })
  password: string;
}
