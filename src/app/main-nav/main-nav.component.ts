import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { User } from '../models/User';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  user: User;
  isLoggedIn: boolean;
  loginStatus: Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginStatus = this.authService.loginStatus.subscribe(status => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.user = this.authService.userEmitter.subscribe();
      }
    })
  }

  onLogout() {
    const message = 'You Have Been Logged Out.';
    this.snackBar.open(message, 'Confirm', { duration: 3000 });
    this.authService.logout();
    this.router.navigate(['']);
  }
}
