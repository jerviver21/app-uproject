import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {take, map} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAuth from './store/auth.reducer';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, OnInit{

  constructor(private store: Store<fromAuth.FeatureState>, private router:Router) { }

  ngOnInit(){

  }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.store.select('auth')
      .pipe(
        take(1),
        map(
          (authState:fromAuth.State) => {
            if(authState.authenticated){
              return true;
            }else{
              this.router.navigate(['/auth/singin']);
            }
          }
        )
      );
  }
}
