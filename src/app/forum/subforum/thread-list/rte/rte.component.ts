import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-rte',
  templateUrl: './rte.component.html',
  styleUrls: ['./rte.component.css'],
})
export class RteComponent implements OnInit {
  editor = ClassicEditor;

  constructor() {}

  ngOnInit(): void {
    ClassicEditor.create(document.querySelector('#editor'), {
      codeBlock: {
        languages: [
          { language: 'JavaScript', label: 'JS' },
          { language: 'Java', label: 'Java' },
          { language: 'Python', label: 'Py' },
          { language: 'Go', label: 'Golang' },
        ],
      },
    });
  }
}
