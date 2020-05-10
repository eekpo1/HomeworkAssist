import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Post } from '../models/post.model';
import { Section } from '../models/Section';
import { SubForum } from '../models/subforum.model';
import { PostService } from './post.service';

interface Forum {
  sections: Section[];
}

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private forum: Forum = {
    sections: [
      {
        name: 'General',
        subForums: [
          new SubForum('Introductions', []),
          new SubForum('Off Topic', []),
          new SubForum('Projects', []),
          new SubForum('Suggestions', []),
        ],
      },
      {
        name: 'Courses',
        subForums: [
          new SubForum('CMPS 2010', []),
          new SubForum('CMPS 2020', []),
          new SubForum('CMPS 3120', []),
          new SubForum('CMPS 3240', []),
          new SubForum('CMPS 3420', []),
          new SubForum('CMPS 3500', []),
          new SubForum('CMPS 3540', []),
          new SubForum('CMPS 3600', []),
          new SubForum('CMPS 3620', []),
        ],
      },
    ],
  };

  private indices = [
    'Introductions',
    'Off Topic',
    'Projects',
    'Suggestons',
    'CMPS 2010',
    'CMPS 2020',
    'CMPS 2020',
    'CMPS 3120',
    'CMPS 3420',
    'CMPS 3500',
    'CMPS 3540',
    'CMPS 3600',
  ];

  private subForum: Post[] = [];
  idx = 0;

  forumObserver = new BehaviorSubject<Section[]>(this.forum.sections);
  threads = new BehaviorSubject<Post[]>(this.subForum);

  constructor(private postService: PostService) {}

  getForum() {
    this.forumObserver.next(this.forum.sections);
  }

  setThreads(subForum: Post[]) {
    this.subForum = subForum;
  }

  getThreads() {
    this.postService.fetchPosts(`${this.idx}`).subscribe(
      (response) => {
        console.log(response.posts);
        this.subForum = response.posts.map((post) => {
          const temp = {
            _id: post._id,
            pinned: post.pinned,
            contents: post.contents,
            author: post.author,
            title: post.title,
            replies: post.replies,
          };
          return temp;
        });
        this.threads.next(this.subForum);
      },
      (error) => {
        console.log(error.error);
      }
    );
    return this.subForum.slice();
  }

  updateIdx(idx: number) {
    this.idx = idx;
  }

  getIndices(): Map<string, number> {
    const indices = this.indices.slice();
    const map = new Map<string, number>();

    for (let i = 0; i < indices.length; i++) {
      map.set(indices[i], i);
    }
    return map;
  }
}
