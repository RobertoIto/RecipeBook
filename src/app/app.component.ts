import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // This initizlizes the Firebase communication.
    firebase.initializeApp({
      apiKey: 'AIzaSyDOdojkU0QOJ2hP0o3vUPhXBi2dzQ3tipk',
      authDomain: 'recipebook-7c095.firebaseio.com'
    });
  }
}
