import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostsService } from './create-posts.service';

describe('CreatePostsService', () => {
  let provider: CreatePostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatePostsService],
    }).compile();

    provider = module.get<CreatePostsService>(CreatePostsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
