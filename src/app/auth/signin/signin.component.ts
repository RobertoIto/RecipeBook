import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {
  susbcription: Subscription;
  error = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // For a subject subscribe is the method to consume the parameter.
    this.susbcription =
      this.authService.error.subscribe(
        (err: string) => {
          this.error = err;
          // console.log(this.error);
        }
      );
  }

  onSignIn(form: NgForm) {
    this.error = '';
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signinUser(email, password);
  }

  ngOnDestroy() {
    this.susbcription.unsubscribe();
  }
}
