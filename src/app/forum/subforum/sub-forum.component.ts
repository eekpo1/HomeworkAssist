import { Component, Input, OnInit } from '@angular/core';
import { Section } from '../../models/Section';

@Component({
  selector: 'app-subforum',
  templateUrl: './sub-forum.component.html',
  styleUrls: ['./sub-forum.component.css'],
})
export class SubForumComponent implements OnInit {
  @Input() sub: string;

  constructor() {}

  ngOnInit(): void {}
}
