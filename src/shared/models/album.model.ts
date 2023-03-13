import { Comment } from 'src/shared/models/comment.model';
import { Reaction } from '../models/reaction.model';

export class Album {
  public title: string;
  public description: string;
  public createdBy: string;
  public imageURL: string;
  public comments: Comment[];
  public reactions: Reaction;
  public id: number;

  constructor(
    title: string,
    description: string,
    createdBy: string,
    imageURL: string,
    comments: Comment[],
    reactions: Reaction,
    id: number
  ) {
    this.title = title;
    this.description = description;
    this.createdBy = createdBy;
    this.imageURL = imageURL;
    this.comments = comments;
    this.reactions = reactions;
    this.id = id;
  }
}
