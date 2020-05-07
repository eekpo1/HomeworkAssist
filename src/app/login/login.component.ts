import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

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
      .subscribe((response: { accessToken: string; userID: string }) => {
        if (response) {
          const id = response.userID;
          console.log(id);
          this.authService.user(id, response.accessToken);
          this.authService.loginSuccess();
          this.router.navigate(['']);
        }
      });
  }
}
