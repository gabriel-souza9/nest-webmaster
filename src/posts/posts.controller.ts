import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    UploadedFile,
    UseInterceptors,
    Req,
    Res,
  } from '@nestjs/common';
  import { PostService } from './posts.service';
  import { PostModel } from './posts.model';
  import { CreatePostDto } from './dto/create-post.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import * as fs  from 'fs';
  import * as path from 'path';

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

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Req() req, @Res() res) {
      const filename = `${new Date().getTime()}-${file.originalname}`.replace(/[^\w.-]/g, '_');

      fs.writeFileSync(`./uploads/${filename}`, file.buffer)
      const urlFile = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
      return res.send({ message:"file saved successfully", file: urlFile});
    }

    @Get(':filename')
    serveFile(@Param('filename') filename: string, @Res() res) {
      const fileLocation = path.resolve(`./uploads/${filename}`);
      return res.sendFile(fileLocation);
    }

  }
  