import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../../models/post.model';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit {
  @Input() thread: Post;
  id: number;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('sdfsdfd');
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }
}
