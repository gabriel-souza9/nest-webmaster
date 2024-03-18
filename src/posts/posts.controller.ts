import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { PostService } from './posts.service';
  import { PostModel } from './posts.model';
  import { CreatePostDto } from './dto/create-post.dto';
  
  @Controller('posts')
  export class PostController {
    constructor(private readonly postService: PostService) {}
  
    @Post()
    async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
      return this.postService.create(createPostDto);
    }
  
    @Get()
    async findAll(): Promise<PostModel[]> {
      return this.postService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PostModel> {
      return this.postService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updatePostDto: CreatePostDto,
    ): Promise<PostModel> {
      return this.postService.update(id, updatePostDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<PostModel> {
      return this.postService.remove(id);
    }
  }
  