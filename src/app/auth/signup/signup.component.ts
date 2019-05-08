import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  error = '';
  susbcription: Subscription;
  test = 'test';

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

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.authService.signupUser(email, password);
  }

  ngOnDestroy() {
    this.susbcription.unsubscribe();
  }
}
