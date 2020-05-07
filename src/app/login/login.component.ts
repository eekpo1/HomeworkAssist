import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onLogin() {
    const username: string = this.loginForm.value.username;
    const password: string = this.loginForm.value.password;
    this.authService
      .login(username, password)
      .subscribe((response: { accessToken: string; _id: string }) => {
        if (response) {
          this.router.navigate(['']);
        }
      });
  }
}
