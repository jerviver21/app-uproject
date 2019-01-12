import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingupComponent } from './singup/singup.component';
import { SinginComponent } from './singin/singin.component';



const appRoutes: Routes = [
  { path: 'singup',component: SingupComponent },
  { path: 'singin',component: SinginComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
