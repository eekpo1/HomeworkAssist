import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ForumService } from './forum.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  subForums: Map<string, number> =
  constructor(private http: HttpClient, private forumService: ForumService) {}



  storePost(id: number) {
    const posts = this.forumService.
  }
}
