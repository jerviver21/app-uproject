import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GeneralComponent } from '../../shared/general/general.component';

import { Store } from '@ngrx/store';

import * as fromRecipe from '../store/recipes.reducer';
import * as RecipeActions from '../store/recipes.actions'; 
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions'; 

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent extends GeneralComponent  implements OnInit, OnDestroy{
  @Input() recipe:Recipe;
  subscription: Subscription;

  constructor(private store:Store<fromRecipe.FeatureState>,
              private route:ActivatedRoute,
              private router:Router) {
                super();

  }

  ngOnInit() {
    super.ngOnInit();
    this.route.params
      .subscribe(
        (params: Params) => {
          this.suscribeRecipe(params);
        }
      );
  }

  private suscribeRecipe(params:Params){
    this.subscription= this.store.select('recipes')
      .subscribe(
        (state:fromRecipe.State)=>{
          this.recipe = state.recipes.get(+params['id']);
          if(this.recipe == null){
            this.recipe = new Recipe(0,'','','',[]);
          }
        }
      );
  }

  onToShoppingList(){
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onDelete(id:number){
    this.store.dispatch(new RecipeActions.DeleteRecipe(id));
    this.router.navigate(['../'], {relativeTo:this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
