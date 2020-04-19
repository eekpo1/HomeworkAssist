import { Injectable } from '@angular/core';
import { Section } from '../models/Section';
import { BehaviorSubject } from 'rxjs';

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
        subForums: ['Introductions', 'Off Topic', 'Projects', 'Suggestions'],
      },
      {
        name: 'Courses',
        subForums: [
          'CMPS 2100',
          'CMPS 2200',
          'CMPS 3120',
          'CMPS 3420',
          'CMPS 3500',
          'CMPS 3540',
          'CMPS 3600',
        ],
      },
    ],
  };

  forumObserver = new BehaviorSubject<Section[]>(this.forum.sections);

  constructor() {}

  getForum() {
    this.forumObserver.next(this.forum.sections);
  }
}
