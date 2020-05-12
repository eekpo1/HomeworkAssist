import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../../models/post.model';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit {
  @Input() thread: Post;
  @Input() id: number;
  path: string;

  constructor() {
  }

  ngOnInit(): void {
    this.path = this.id.toString();
    console.log(this.path);
    // console.log('sdfsdfd');
    // this.route.params.subscribe((params) => {
    //   this.id = params.thread;
    //   console.log(this.id);
    // });
  }
}
