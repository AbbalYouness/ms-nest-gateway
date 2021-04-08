import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProxyFactory,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';

import { AuthController } from './auth.controller';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_HOST_URL')],
            queue: configService.get('RABBITMQ_AUTH_QUEUE_NAME'),
            queueOptions: {
              durable: true,
            },
          },
        } as RmqOptions),
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
