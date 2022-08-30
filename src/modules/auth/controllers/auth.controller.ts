import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticateUserService } from '../../auth/services/authenticate-user.service';
import { ICreateUserDTO } from '../../users/dtos/ICreateUserDTO';

@Controller('session')
export class AuthController {
  constructor(
    private readonly authenticateUserService: AuthenticateUserService,
  ) {}

  @Post()
  async authenticate(@Body() { email, password }: Partial<ICreateUserDTO>) {
    return await this.authenticateUserService.execute({ email, password });
  }
}
