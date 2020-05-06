export class Post {
  constructor(
    private id: string,
    public pinned: boolean,
    public title?: string,
    public replies?: Post[]
  ) {}
}
