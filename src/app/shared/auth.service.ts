import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  loginStatus = new BehaviorSubject<boolean>(this.loggedIn);
  currentUser: User;
  userEmitter = new Subject<User>();

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
            console.log('Successful)');
            this.currentUser = user;
            this.login(user.username, user.password).subscribe((res) => {
              this.currentUser.id = res.userID;
              this.currentUser.token = res.accessToken;
              this.loggedIn = true;
              this.loginStatus.next(this.loggedIn);
              this.userEmitter.next(this.currentUser);
              console.log(this.currentUser.username);
            });
          }
        })
      );
  }

  login(username: string, password: string) {
    return this.httpClient.post<{ accessToken: string; userID: string }>(
      'http://localhost:4200/api/login',
      { username, password }
    );
  }

  user(id: string, token: string) {
    this.httpClient
      .get<{ user: any }>(`http://localhost:3000/api/users/${id}`)
      .subscribe((result) => {
        const user = result.user;
        // console.log(`USER:::::: ${id}`);
        // console.log(`USER::::::::::::::: ${user}`);
        // console.log(user);
        // console.log(`${user._id}`);

        // console.log(`this is supposed to be the user: ${user}`)
        // this.currentUser = user;
        this.currentUser = {
          id: user._id,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          password: user.password,
          roles: user.roles,
          token,
        };
        console.log(this.currentUser);
        this.loggedIn = true;
        this.loginStatus.next(this.loggedIn);
        this.userEmitter.next(this.currentUser);
      });
  }

  // user(id: string, token: string) {
  //   this.httpClient.get<any>('http://localhost:3000/api/users/${id}').subscribe(user => {
  //     console.log(user)
  //   })
  //   }

  loginSuccess() {
    this.loggedIn = true;
    this.loginStatus.next(this.loggedIn);
  }

  logout() {
    this.loggedIn = false;
    this.loginStatus.next(this.loggedIn);
  }
}

interface User2 {
  roles: {
    admin: boolean;
    moderator: boolean;
    verified: boolean;
  };
  refreshToken: string;
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  dateJoined: Date;
  __v: number;
}
