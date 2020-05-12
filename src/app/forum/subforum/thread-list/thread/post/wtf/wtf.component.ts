import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../../../../models/post.model';

@Component({
  selector: 'app-wtf',
  templateUrl: './wtf.component.html',
  styleUrls: ['./wtf.component.css'],
})
export class WtfComponent implements OnInit {
  @Input() wat: Post;

  constructor() {}

  ngOnInit(): void {}
}
