import { Injectable } from '@angular/core';
import { Announcement } from '../models/Announcement';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  feedSubject = new Subject<Announcement[]>();

  constructor() {}

  feed: Announcement[] = [
    {
      title: 'Corona Virus Spurs Homework Assist',
      date: new Date(2020, 3, 12),
      contents: `
        Coronavirus has Prompted the closure of California State University Bakersfield. The students
        must now prepare to transition to strictly online classes, causing uncertainty among students and faculty.
        Our Group decides to make our project one that would help the school, specifically our peers. Students don't have a
        third-party discussion board they can rely on to ask problems concerning classes, and our tutors are reduced to
        using discord and zoom to help with coursework, which may not be the optimal solution.
      `,
      author: 'Eddie',
    },
    {
      title: 'The Group Decides to Create Homework Assist',
      date: new Date(2020, 3, 21),
      contents: `
        Our team has decided on the project, Homework Assist, to tackle the Covid-19 problem we're faced with.
        We will create a forum for the computer science departments, having tutors and those who are familiar
        with subject matter help others who need it, and the information be stored. Homework Assist aims to
        consolidate the breadth of CS knowledge in CSUB into one area, helping students search for relevant
        topics.
      `,
      author: 'Eddie',
    },
  ];

  getFeed(): Announcement[] {
    this.feedSubject.next(this.feed.slice());
    return this.feed.slice();
  }
}
