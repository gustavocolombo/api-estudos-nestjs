import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { PrismaService } from '../../shared/connection/prisma.service';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { SendMailProducerService } from '../jobs/send-mail-producer.service';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sendMailServiceQueue: SendMailProducerService,
  ) {}

  async execute({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<Partial<User>> {
    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: await hash(password, 8),
      },
      select: {
        name: true,
        email: true,
      },
    });

    await this.sendMailServiceQueue.execute({ name, email });

    return user;
  }
}
