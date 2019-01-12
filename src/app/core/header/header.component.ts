import { Component, Output , EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../../recipes/recipe.model';

import { map, take, switchMap } from 'rxjs/operators';
import { GeneralComponent } from '../../shared/general/general.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as RecipeActions from '../../recipes/store/recipes.actions'; 
import * as AuthActions from '../../auth/store/auth.actions';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends GeneralComponent implements OnInit{
  isAuth: boolean  = false;

  constructor(private store:Store<fromApp.AppState>,
              private router:Router) {
                super();
               }

  ngOnInit(){
    super.ngOnInit();
    this.store.select('auth')
      .subscribe(
        (state)=>{
          if(state){
            this.isAuth = state.authenticated;
          }
        }
      );
  }

  onSaveData(){
    //Es en este componente en donde se mostraria error o exito, por eso la suscripcion se realiza aqui
    console.log('Header...');
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData(){
    console.log('Header...');
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout(){
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth/singin']);
  }


}
