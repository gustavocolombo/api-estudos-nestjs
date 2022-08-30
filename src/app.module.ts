import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule, PostsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
