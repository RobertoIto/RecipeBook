import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  token: string;
  email: string;
  error = new Subject<string>();

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          this.signinUser(email, password);
          this.error.next(null);
        }
      )
      .catch(
        err => {
          this.error.next(err);
          // console.log(this.error);
        }
      );
  }

  signinUser(email: string, password: string) {
    this.email = email;

    // Here we can get the token in this promise. We will wait for
    // the response to arrive and pass it to the this.token.
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );

          this.error.next(null);
        }
      )
      .catch(
        err => {
          this.error.next(err);
          // console.log(this.error);
        }
      );
  }

  logoutUser() {
    firebase.auth().signOut();
    this.token = null;
  }

  // Here we run the get token again but we won't wait it to finish
  // and return the this.token.
  // This is a quick solution that will work for the most user cases.
  getIdToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }

  getUserEmailAlpha() {
    const alpha = this.email.replace(/[^0-9A-Z]+/gi, '');

    return alpha;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
