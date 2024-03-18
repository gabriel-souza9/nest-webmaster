import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { PostModule } from './posts/posts.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CheckAuthMiddleware } from './middlewares/checkAuth.middleware';
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
  imports: [
    MulterModule.register({
      dest:  path.join(__dirname, '../../uploads'),
    }),
    MongooseModule.forRoot(process.env.STRING_DB),
    PostModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..','uploads'),
      serveRoot: '/uploads' 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckAuthMiddleware)
      .forRoutes('*');
  }
}
