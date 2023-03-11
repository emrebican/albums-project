import { Comment } from 'src/shared/models/comment.model';
import { Reaction } from '../models/reaction.model';

export class Album {
  public title: string;
  public description: string;
  public createdBy: string;
  public imageURL: string;
  public comments: Comment[];
  public reactions: Reaction;

  constructor(
    title: string,
    description: string,
    createdBy: string,
    imageURL: string,
    comments: Comment[],
    reactions: Reaction
  ) {
    this.title = title;
    this.description = description;
    this.createdBy = createdBy;
    this.imageURL = imageURL;
    this.comments = comments;
    this.reactions = reactions;
  }
}
