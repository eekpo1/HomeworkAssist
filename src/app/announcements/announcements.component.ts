import { Component, OnDestroy, OnInit } from '@angular/core';
import { Announcement } from '../models/Announcement';
import { AnnouncementService } from '../shared/announcement.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent implements OnInit, OnDestroy {
  announcements: Announcement[];
  announcementsSub: Subscription;

  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcements = this.announcementService.getFeed();
    this.announcementService.feedSubject.subscribe((feed: Announcement[]) => {
      this.announcements = feed;
    });
  }

  ngOnDestroy(): void {
    this.announcementsSub.unsubscribe();
  }
}
