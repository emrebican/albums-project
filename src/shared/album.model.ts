import { Comment } from 'src/shared/comment.model';

export class Album {
  public title: string;
  public description: string;
  public imageURL: string;
  public comments: Comment[];

  constructor(
    title: string,
    description: string,
    imageURL: string,
    comments: Comment[]
  ) {
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.comments = comments;
  }
}
