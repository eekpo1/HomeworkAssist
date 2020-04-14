import { Component, Input, OnInit } from '@angular/core';
import { Announcement } from '../../models/Announcement';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css'],
})
export class AnnouncementComponent implements OnInit {
  @Input() announcement: Announcement;
  @Input() index: number;
  @Input() length: number;
  aDescription: string;

  constructor() {}

  ngOnInit(): void {
    this.aDescription = `By  ${this.announcement.author}`;
  }
}
