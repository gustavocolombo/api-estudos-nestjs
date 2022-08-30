import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import ensureAuthenticatedMiddleware from '../shared/middlewares/ensureAuthenticateUser';
import { CreatePostsService } from './services/create-posts.service';
import { PostsController } from './controllers/posts.controller';
import { PrismaService } from '../shared/connection/prisma.service';
import { ListsPostsByUserService } from './services/list-posts-user.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  providers: [CreatePostsService, PrismaService, ListsPostsByUserService],
  controllers: [PostsController],
})
export class PostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ensureAuthenticatedMiddleware)
      .forRoutes({ path: '/posts', method: RequestMethod.POST });
  }
}
