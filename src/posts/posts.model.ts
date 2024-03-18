import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<PostModel>;


@Schema()
export class PostModel{
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop()
  description: string;

  @Prop()
  link: string;

  @Prop()
  file_url: string;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);

export interface IPost extends Document {
  title: string;
  type: string;
  description?: string;
  link?: string;
  file_url?: string;
}
