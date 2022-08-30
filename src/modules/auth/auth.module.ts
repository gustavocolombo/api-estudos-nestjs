import { Module } from '@nestjs/common';
import { PrismaService } from '../shared/connection/prisma.service';
import { AuthController } from './controllers/auth.controller';
import { AuthenticateUserService } from './services/authenticate-user.service';

@Module({
  providers: [AuthenticateUserService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
