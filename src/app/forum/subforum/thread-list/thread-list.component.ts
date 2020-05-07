import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ForumService } from '../../../shared/forum.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { RteComponent } from './new-thread/rte.component';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css'],
})
export class ThreadListComponent implements OnInit {
  id: number;
  threads: Post[];

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.threads = this.forumService.getThreads();
    });
  }

  newThread() {
    this.bottomSheet.open(RteComponent);
  }
}
