import { IsString, IsUUID } from 'class-validator';

export class ICreatePostsDTO {
  @IsString()
  content: string;

  @IsString()
  title: string;

  @IsUUID()
  user_id: string;
}
