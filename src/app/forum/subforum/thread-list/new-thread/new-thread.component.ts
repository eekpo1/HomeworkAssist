import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthService } from 'src/app/shared/auth.service';
import { ForumService } from 'src/app/shared/forum.service';

@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css'],
})
export class NewThreadComponent implements OnInit {
  @ViewChild('title') title: HTMLInputElement;
  editor = ClassicEditor;
  model = {
    data: '<p>Insert Text Here</p>',
  };
  simulate = false;

  constructor(
    private route: ActivatedRoute,
    private forumService: ForumService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onPost(title: HTMLInputElement) {
    let id = '';
    this.route.params.subscribe((params) => {
      id = params.id;
    });
    console.log(title.value);
    const user = this.authService.currentUser;
    console.log(this.model.data);
    const post = {
      _id: null,
      pinned: true,
      contents: this.model.data,
      author: user.username,
      title: title.value,
      replies: [],
    };
    this.simulate = !this.simulate;
    setTimeout(() => {
      this.simulate = !this.simulate;
      this.forumService.submitThread(id, post).subscribe((response) => {
        post._id = response.id;
        console.log(post);
        const newThreads = this.forumService.getThreads();
        newThreads.push(post);
        this.forumService.setThreads(newThreads);
        this.router.navigate(['forum', id]).then(() => {
          this.snackBar.open(response.message, 'OK', { duration: 1000 });
        });
      });
    }, 1000);
  }
}
