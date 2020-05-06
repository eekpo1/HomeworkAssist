import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements OnInit {
  @Input() threads: string;

  constructor() {}

  ngOnInit(): void {}
}
