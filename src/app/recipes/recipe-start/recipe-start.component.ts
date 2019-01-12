import { Component, OnInit } from '@angular/core';
import { GeneralComponent } from '../../shared/general/general.component';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent extends GeneralComponent  implements OnInit {

  constructor(){
    super(); 
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
