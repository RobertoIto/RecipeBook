import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  token: string;
  email: string;

  // A subject variable of type string is created to keep the
  // error messages from the signup and login procedures.
  error = new Subject<string>();

  constructor(private router: Router) {}

  // The signup user call the firebase create user function,
  // waits for the response (.then) or an error (.catch).
  // Our subject variable is triggered to get the authentication
  // methods. The .next push the values to the subject variable.
  // If we use simple variables it is possible to get the messages.
  // However, we need an observable into the other component to
  // get these messages and present them into the HTML file.
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

  // The signin user call the firebase signin user function,
  // waits for the response (.then) or an error (.catch).
  // The comments about the subject is the same as above.
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
