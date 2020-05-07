import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ThreadListComponent } from '../thread-list.component';
import { ForumService } from '../../../../shared/forum.service';

@Component({
  selector: 'app-rte',
  templateUrl: './rte.component.html',
  styleUrls: ['./rte.component.css'],
})
export class RteComponent implements OnInit {
  @Input() replying: boolean;
  @ViewChild('title') title: string;
  @ViewChild('contents') contents: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ThreadListComponent>,
    private forumService: ForumService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
    console.log(this.title);
    console.log(this.contents);
  }
}
