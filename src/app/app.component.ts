import { Component, OnInit } from '@angular/core';

import *  as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor() { }

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAzrESJ2f1AkxOT6pYXmHqa2C_kJaES_Lg",
      authDomain: "ng-recipes-book-e1fe0.firebaseapp.com"
    });
  }
}
