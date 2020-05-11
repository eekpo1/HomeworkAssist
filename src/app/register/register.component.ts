import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      firstname: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/.*[0-9]/),
        Validators.pattern(/.{8,}/),
      ]),
      passwordConfirm: new FormControl(
        '',
        [Validators.required],
        this.confirmPasswordValidator.bind(this)
      ),
    });
  }

  onSubmit() {
    this.authService
      .register(
        this.registerForm.value.username,
        this.registerForm.value.firstname,
        this.registerForm.value.lastname,
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .subscribe(
        (response) => {
          if (response && response.message === 'Successful') {
            this.router.navigate(['']).then((r) => {
              return r;
            });
          }
          // console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  confirmPasswordValidator(
    control: FormControl
  ): Promise<any> | Observable<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value !== this.registerForm.value.password) {
          resolve({ passwordNotMatching: true });
        } else {
          resolve(null);
        }
      });
    });
  }
}
