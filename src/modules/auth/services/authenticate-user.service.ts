import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authconfig from '../../shared/config/authconfig';
import { PrismaService } from '../../shared/connection/prisma.service';
import { ICreateUserDTO } from '../../users/dtos/ICreateUserDTO';

@Injectable()
export class AuthenticateUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ email, password }: Partial<ICreateUserDTO>) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { email },
    });

    const comparePassword = await compare(password, user.password);

    if (comparePassword == null)
      throw new UnauthorizedException(
        'Combination of email/password incorrect',
      );

    const token = sign(
      {
        email: user.email,
        name: user.name,
      },
      authconfig.secretKey,
      {
        subject: user.id,
        expiresIn: authconfig.expiresIn,
      },
    );

    delete user.password;

    return { token, user };
  }
}
