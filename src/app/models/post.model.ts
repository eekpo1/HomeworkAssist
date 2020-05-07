export class Post {
  constructor(
    // tslint:disable-next-line:variable-name
    private _id: string,
    public pinned: boolean,
    public content: string,
    public title?: string,
    public replies?: Post[]
  ) {}
  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }
}
