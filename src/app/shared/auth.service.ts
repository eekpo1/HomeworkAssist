import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  loginStatus = new BehaviorSubject<boolean>(this.loggedIn);
  currentUser: User;

  constructor(private httpClient: HttpClient) {}

  register(
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    const user: User = {
      id: null,
      username,
      firstname,
      lastname,
      email,
      password,
      token: null,
      roles: {
        admin: false,
        moderator: false,
        verified: true,
      },
    };
    return this.httpClient
      .post<{ message: string }>('http://localhost:4200/api/register', user)
      .pipe(
        tap((response) => {
          if (response && response.message === 'Successful') {
            this.currentUser = user;
            this.login(user.username, user.password).subscribe((res) => {
              this.currentUser.id = res._id;
              this.currentUser.token = res.accessToken;
            });
          }
        })
      );
  }

  login(username: string, password: string) {
    return this.httpClient.post<{ accessToken: string; _id: string }>(
      'http://localhost:4200/api/login',
      { username, password }
    );
  }

  user(id: string) {
    this.httpClient
      .get<User>(`http://localhost:4200/api/users/${id}`)
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  loginSuccess() {
    this.loggedIn = true;
    this.loginStatus.next(this.loggedIn);
  }

  logut() {
    this.loggedIn = false;
    this.loginStatus.next(this.loggedIn);
  }
}

interface User2 {
  username: string;
  email: string;
  password: string;
}
