export interface I_React {
  thumb: number;
  like: number;
  comment: number;
}

export class Reaction {
  public users: string[];
  public reacts: I_React;

  constructor(users: string[], reacts: I_React) {
    this.users = users;
    this.reacts = reacts;
  }
}
