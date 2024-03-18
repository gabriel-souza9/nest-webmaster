import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModel, PostSchema } from './posts.model';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: PostModel.name, schema: PostSchema }])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
