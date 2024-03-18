export class CreatePostDto {
  readonly title: string;
  readonly type: string;
  readonly description?: string;
  readonly link?: string;
  readonly file_url?: string;
}
