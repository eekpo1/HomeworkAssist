import { Component, OnDestroy, OnInit } from '@angular/core';
import { Section } from '../models/Section';
import { Subscription } from 'rxjs';
import { ForumService } from '../shared/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
})
export class ForumComponent implements OnInit, OnDestroy {
  structure: Section[];
  private forumSubscriber: Subscription;

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.forumSubscriber = this.forumService.forumObserver.subscribe(
      (structure) => {
        this.structure = structure;
      }
    );
  }

  ngOnDestroy(): void {
    this.forumSubscriber.unsubscribe();
  }
}
