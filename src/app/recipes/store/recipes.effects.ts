import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, withLatestFrom, map, catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Store} from '@ngrx/store';

import * as RecipeActions from './recipes.actions';
import {Recipe} from '../recipe.model';
import * as fromRecipe from './recipes.reducer';
import * as fromAuth from '../../auth/store/auth.reducer';
import { of } from 'rxjs';

@Injectable()
export class RecipeEffects {

  @Effect()
  recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPES)
    .pipe(
        switchMap(
            (action: RecipeActions.FetchRecipes) => {
                return this.http.get<Recipe[]>(   
                    'https://ng-recipes-book-e1fe0.firebaseio.com/recipes.json',
                    {   observe: 'body',
                        responseType: 'json'})
            }
        ), 
        map(
            (recipes) => {
                console.log('Effect...'+recipes);
                for (let recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return {
                    type: RecipeActions.SET_RECIPES,
                    payload: recipes
                };
            }
        ),
        catchError(
            (error) => {
                console.log('Crear Action para este error y muestra de mensaje '+error);
           
                return of({
                    type: RecipeActions.SET_RECIPES,
                    payload: null
                });
            }
        )
    );

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPES)
    .pipe(
        withLatestFrom(this.store.select('recipes'))
        ,
        switchMap(
            ([action, state]) => {
                console.log('Effect... '+state.recipes.values());
                return this.http.put<Recipe[]>( 'https://ng-recipes-book-e1fe0.firebaseio.com/recipes.json', 
                                                Array.from(state.recipes.values())
                                              );
            }
        )
    );

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {
  }
}
