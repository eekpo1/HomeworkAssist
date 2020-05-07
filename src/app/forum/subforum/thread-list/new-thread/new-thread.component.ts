import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css'],
})
export class NewThreadComponent implements OnInit {
  post: FormGroup;
  editor = ClassicEditor;

  constructor() {}

  ngOnInit(): void {
    this.post = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
    });
  }

  onPost() {}
}
