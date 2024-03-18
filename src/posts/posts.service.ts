import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostModel } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(PostModel.name) private postModel: Model<PostModel>) {}

  async create(createPostDto: CreatePostDto): Promise<PostModel> {
    const createdPost: any = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<PostModel[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<PostModel> {
    return this.postModel.findById(id).exec();
  }

  async update(id: string, updatePostDto: CreatePostDto): Promise<PostModel> {
    return this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<PostModel> {
    return this.postModel.findByIdAndDelete(id).exec();
  }
}
