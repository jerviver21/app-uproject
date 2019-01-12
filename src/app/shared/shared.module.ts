import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { GeneralComponent } from './general/general.component';


@NgModule({
  declarations: [
    DropdownDirective,
    GeneralComponent
  ],
  exports: [
    DropdownDirective,
    GeneralComponent
  ]
})
export class SharedModule { }
