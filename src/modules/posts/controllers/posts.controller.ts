import {
  Body,
  Controller,
  Post,
  CACHE_MANAGER,
  Inject,
  Get,
} from '@nestjs/common';
import { ICreatePostsDTO } from '../dtos/ICreatePostsDTO';
import { CreatePostsService } from '../services/create-posts.service';
import { ListsPostsByUserService } from '../services/list-posts-user.service';
import { Cache } from 'cache-manager';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly createPostsService: CreatePostsService,
    private readonly listPostsService: ListsPostsByUserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  async createPost(@Body() { content, title, user_id }: ICreatePostsDTO) {
    return await this.createPostsService.execute({ content, title, user_id });
  }

  @Get('/:id')
  async listPosts(@Body() user_id: string) {
    const posts = await this.listPostsService.execute(user_id);
    await this.cacheManager.set('posts', posts);
    const getCachePosts = await this.cacheManager.get('posts');

    console.log('cacheando', getCachePosts);

    return getCachePosts;
  }
}
