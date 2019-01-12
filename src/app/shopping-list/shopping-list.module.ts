
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './store/shopping-list.reducer';


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule,
    SharedModule,
    StoreModule.forFeature('shoppingList', shoppingListReducer)
  ]
})
export class ShoppingListModule { }
