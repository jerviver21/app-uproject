import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShopingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('form') form: NgForm;
  subscription: Subscription;

  constructor(private store:Store<fromShopingList.FeatureState>){

  }

  ngOnInit(){
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        (state:fromShopingList.State) => {
          var ingredient:Ingredient = state.editedIngredient;
          if(this.form.controls['name']){
            this.form.setValue(
              {
                id:ingredient.id,
                name:ingredient.name,
                amount:ingredient.amount
              }
            );
          }
        }
    );
  }

  onSubmit(){
    this.store.dispatch(new ShoppingListActions.AddIngredient(
          new Ingredient(+this.form.value.id, this.form.value.name, this.form.value.amount)
        )
      );
    this.form.reset();
  }

  onClear(){
    this.form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
