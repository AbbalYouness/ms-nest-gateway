import {
  ClientProxyFactory,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_HOST_URL')],
            queue: configService.get('RABBITMQ_USER_QUEUE_NAME'),
            queueOptions: {
              durable: true,
            },
          },
        } as RmqOptions),
      inject: [ConfigService],
    },
  ],
})
export class UserModule {}
