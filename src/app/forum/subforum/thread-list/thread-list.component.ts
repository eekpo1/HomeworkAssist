import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Post } from '../../../models/post.model';
import { ForumService } from '../../../shared/forum.service';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css'],
})
export class ThreadListComponent implements OnInit {
  id: number;
  threads: Post[];

  // threads = ['sfdsfsd', '1', '3', '3'];

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      console.log(this.id);
      this.forumService.updateIdx(this.id);
      this.forumService.getThreads();
      this.forumService.threads.subscribe((threads) => {
        this.threads = threads;
      });
    });
  }
}
