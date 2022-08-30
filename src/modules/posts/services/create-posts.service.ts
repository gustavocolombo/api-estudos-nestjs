import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/connection/prisma.service';
import { ICreatePostsDTO } from '../dtos/ICreatePostsDTO';

@Injectable()
export class CreatePostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute({ content, title, user_id }: ICreatePostsDTO) {
    const post = await this.prismaService.posts.create({
      data: {
        content,
        title,
        user_id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return post;
  }
}
