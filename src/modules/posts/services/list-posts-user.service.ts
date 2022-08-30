import { Injectable } from '@nestjs/common';
import { Posts } from '@prisma/client';
import { PrismaService } from '../../shared/connection/prisma.service';

@Injectable()
export class ListsPostsByUserService {
  constructor(private prismaService: PrismaService) {}

  async execute(user_id: string): Promise<Posts[]> {
    const findPostsByUser = await this.prismaService.posts.findMany({
      where: { user_id: user_id },
    });

    return findPostsByUser;
  }
}
