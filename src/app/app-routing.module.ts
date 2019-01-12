import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';


const appRoutes: Routes = [
  //{ path: '', redirectTo:'recipes', pathMatch:'full'}
  { path: '', component:HomeComponent},
  { path: 'recipes', loadChildren:'./recipes/recipes.module#RecipesModule'},
  { path: 'shopping-list', loadChildren:'./shopping-list/shopping-list.module#ShoppingListModule'},
  { path: 'auth', loadChildren:'./auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
