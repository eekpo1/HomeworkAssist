import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Post } from '../models/post.model';
import { Section } from '../models/Section';
import { SubForum } from '../models/subforum.model';

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

  forumObserver = new BehaviorSubject<Section[]>(this.forum.sections);

  constructor(private http: HttpClient) {}

  getForum() {
    this.forumObserver.next(this.forum.sections);
  }

  getThreads(i: number) {}
}
