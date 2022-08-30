import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { PrismaService } from '../shared/connection/prisma.service';
import { SendMailProducerService } from './jobs/send-mail-producer.service';
import { SendMailConsumerService } from './jobs/send-mail-consumer.service';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsersController } from './controllers/users.controller';
import { AuthenticateUserService } from '../auth/services/authenticate-user.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'send-mail-queue',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'alfonso.wuckert61@ethereal.email',
          pass: 'tpPQq5zSbGWfRKVzsk',
        },
      },
    }),
  ],
  providers: [
    PrismaService,
    CreateUserService,
    SendMailProducerService,
    SendMailConsumerService,
    AuthenticateUserService,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
