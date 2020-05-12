import { Component, Input, OnInit } from '@angular/core';
import { SubForum } from 'src/app/models/subforum.model';

@Component({
  selector: 'app-subforum',
  templateUrl: './sub-forum.component.html',
  styleUrls: ['./sub-forum.component.css'],
})
export class SubForumComponent implements OnInit {
  @Input() sub: SubForum;
  @Input() index: number;

  constructor() {}

  ngOnInit(): void {}
}
