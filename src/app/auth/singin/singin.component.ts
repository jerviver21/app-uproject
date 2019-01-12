import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromAuth from '../store/auth.reducer';
import * as AuthActions from '../store/auth.actions';
import { take, map, switchMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {
  errorMessage:string;

  constructor(private store:Store<fromAuth.FeatureState>,
              private router:Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm){
    this.store.dispatch(new AuthActions.TrySignin({username: f.value.email, password: f.value.password}));  
    this.router.navigate(['../../recipes'], {relativeTo:this.route});
  }

  onTest(){
    this.store.select('auth')
      .pipe(
        take(5),
        map(
          (state) => {
            console.log("* Observables Map *: "+state);
            return "Test2";
          }
        ),
        map(
          (array) =>{
            console.log("* Observables Map *: "+array);
            return "Test1";
          }
        )
      )
      .subscribe(
        (data)=>{
          console.log("* Observables Suscription *: "+data);
        }
      );
  }

}

