import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../../../shared/forum.service';
import { Post } from '../../../../../models/post.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  post: Post;
  id: number;
  forumIdx = this.forumService.getIndices().keys()[this.forumService.idx];

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params.thread;
    });

    this.forumService.threads.subscribe((threads) => {
      this.post = threads[this.id];
    });
  }
}
