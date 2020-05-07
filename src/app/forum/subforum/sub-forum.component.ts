import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SubForum} from 'src/app/models/subforum.model';
import {ForumService} from 'src/app/shared/forum.service';

@Component({
  selector: 'app-subforum',
  templateUrl: './sub-forum.component.html',
  styleUrls: ['./sub-forum.component.css'],
})
export class SubForumComponent implements OnInit {
  @Input() sub: SubForum;
  @Input() index: number;

  constructor(
  ) {
  }

  ngOnInit(): void {

  }

}
