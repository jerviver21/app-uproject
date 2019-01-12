import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralComponent } from '../../shared/general/general.component';
import { Store } from '@ngrx/store';

import * as fromRecipe from '../store/recipes.reducer';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent extends GeneralComponent implements OnInit, OnDestroy{
  recipes:Recipe[] = [];
  subscription: Subscription;

  constructor(private store:Store<fromRecipe.FeatureState>, 
    private router:Router, 
    private route:ActivatedRoute){
      super();
  }

  ngOnInit(){
    super.ngOnInit();

    this.subscription= this.store.select('recipes')
      .subscribe(
        (state:fromRecipe.State)=>{
          if(state.recipes){
            this.recipes = Array.from(state.recipes.values());
          }
        }
      );
  }

  onNew(){
    //Una forma más fácil es en el html directamente: 
    //<a style="cursor: pointer;" class="list-group-item clearfix" [routerLink]='[recipe.id]'">
    this.router.navigate(["new"], {relativeTo:this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
