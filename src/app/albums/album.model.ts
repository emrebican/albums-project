export class Album {
  public title: string;
  public description: string;
  public imageURL: string;
  public comments: string[];

  constructor(
    title: string,
    description: string,
    imageURL: string,
    comments: string[] // Changable (yorum, yorum yapan)
  ) {
    this.title = title;
    this.description = description;
    this.imageURL = imageURL;
    this.comments = comments;
  }
}
