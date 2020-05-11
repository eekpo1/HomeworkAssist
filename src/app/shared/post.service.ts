import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // subForums = this.forumService.getIndices();

  constructor(private http: HttpClient) {}

  storePost(forum: string, post: Post): Observable<any> {
    return this.http.post<{ message: string; id: string }>(
      `http://localhost:4200/api/posts/${forum}`,
      post
    );
  }

  updatePost(forum: string, postId: string, content: string): Observable<any> {
    return this.http.patch<ResponseBody>(
      `http://localhost:4200/api/posts/${forum}/${postId}`,
      content
    );
  }

  fetchPosts(forum: string) {
    return this.http.get<{ message: string; posts: Post[] }>(
      `http://localhost:4200/api/posts/${forum}`
    );
  }

  deletePost(forum: string): Observable<any> {
    return this.http.delete<ResponseBody>(
      `http://localhost:4200/api/posts/${forum}`
    );
  }
}

export interface ResponseBody {
  message: string;
  documents?: Post[];
  post?: Post[];
  id?: string;
}
