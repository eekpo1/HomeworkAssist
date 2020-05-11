// export class Post {
//   constructor(
//     // tslint:disable-next-line:variable-name
//     private _id: string,
//     public pinned: boolean,
//     public contents: string,
//     public author: string,
//     public title?: string,
//     public replies?: Post[]
//   ) {}
//   get id(): string {
//     return this._id;
//   }
//
//   set id(id: string) {
//     this._id = id;
//   }
// }

export interface Post {
  _id: string | null;
  pinned: boolean;
  contents: string;
  author: string;
  title?: string;
  replies: Post[];
}
