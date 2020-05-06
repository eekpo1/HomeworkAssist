import { Post } from './post.model';

export class SubForum {
  constructor(public title: string, public threads: Post[]) {}
}
