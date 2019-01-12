import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute,Router, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:Recipe;

  constructor(
    private router: Router, 
    private route: ActivatedRoute){}

  ngOnInit(){

  }

}
