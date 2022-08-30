import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { CreateUserService } from '../services/create-user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: CreateUserService) {}

  @Post()
  async createUser(
    @Body(new ValidationPipe()) { name, email, password }: ICreateUserDTO,
  ) {
    return await this.userService.execute({ name, email, password });
  }
}
