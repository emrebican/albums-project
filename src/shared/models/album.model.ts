import { Comment } from 'src/shared/models/comment.model';
import { Reaction } from '../models/reaction.model';

export class Album {
  public title: string;
  public description: string;
  public imageURL: string;
  public comments: Comment[];
  public reactions: Reaction;

  constructor(
    title: string,
    description: string,
    imageURL: string,
    comments: Comment[],
    reactions: Reaction
  ) {
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.comments = comments;
    this.reactions = reactions;
  }
}
