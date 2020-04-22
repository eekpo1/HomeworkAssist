import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  register(username: string, email: string, password: string) {
    const user: User2 = { username, email, password };
    return this.httpClient.post<{ message: string }>(
      'http://localhost:4200/api/register',
      user
    );
  }
}

interface User2 {
  username: string;
  email: string;
  password: string;
}
