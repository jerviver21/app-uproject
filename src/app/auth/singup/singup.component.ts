import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as fromAuth from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  constructor(private store:Store<fromAuth.FeatureState>) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm){
    this.store.dispatch(new AuthActions.TrySignup({username: f.value.email, password: f.value.password})); 
  }

}
