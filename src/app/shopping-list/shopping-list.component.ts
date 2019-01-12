import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShopingList from './store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  ingredients:Ingredient[];

  constructor(private store:Store<fromShopingList.FeatureState>){

  }

  ngOnInit(){
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        (state:fromShopingList.State) => {
          this.ingredients = Array.from( state.ingredients.values() );
        }
      );
  }

  editIngredient(id:number){
    this.store.dispatch(new ShoppingListActions.StartEdit(id));
  }

  onRemove(id:number){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
