import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ForumService } from './forum.service';
import { Post } from '../models/post.model';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  // subForums = this.forumService.getIndices();

  constructor(private http: HttpClient) {}

  storePost(forum: string, post: Post): Observable<any> {
    return this.http.post<ResponseBody>(
      `http://localhost:4200/api/posts/${forum}/${post}`,
      post
    );
  }

  updatePost(forum: string, postId: string, content: string): Observable<any> {
    return this.http.patch<ResponseBody>(
      `http://localhost:4200/api/posts/${forum}/${postId}`,
      content
    );
  }

  fetchPosts(forum: string): Observable<any> {
    return this.http.get<ResponseBody>(
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
