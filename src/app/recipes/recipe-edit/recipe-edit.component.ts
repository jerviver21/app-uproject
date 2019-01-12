import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRecipe from '../store/recipes.reducer';
import * as RecipeActions from '../store/recipes.actions'; 
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  subscription: Subscription;
  currentRecipe={
                  "id": new  FormControl(),
                  "name": new  FormControl('',  Validators.required),
                  "imagePath": new  FormControl('', Validators.required),
                  "description": new  FormControl('', Validators.required),
                  "ingredients":new FormArray([])
                };

  constructor(private route:ActivatedRoute, 
              private store:Store<fromRecipe.FeatureState>,
              private router:Router) { }

  ngOnInit() {
    this.initForm();
    this.route.params
      .subscribe(
        (params: Params) => {
          if(params['id']!= null){
            this.initCurrentRecipe(+params['id']);
          }
          this.initForm();
        }
      );
  }

  initCurrentRecipe(id:number){
    this.subscription= this.store.select('recipes')
      .subscribe(
        (state:fromRecipe.State)=>{
          const recipe = state.recipes.get(id);
          this.currentRecipe.id = new  FormControl(recipe.id);
          this.currentRecipe.name = new  FormControl(recipe.name);
          this.currentRecipe.imagePath = new  FormControl(recipe.imagePath);
          this.currentRecipe.description = new  FormControl(recipe.description);
          if(recipe.ingredients){
            for(let ingredient of recipe.ingredients){
              this.currentRecipe.ingredients.push(
                new FormGroup({
                  id: new FormControl(ingredient.id),
                  name: new FormControl(ingredient.name, Validators.required),
                  amount : new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[0-9]*$/)])
                })
              );
            }
          }
        }
      );  
  }

  onSubmit(){
    this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    this.router.navigate(['../', {relativeTo:this.route}]);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        id:new FormControl(),
        name:new FormControl(null, Validators.required),
        amount:new FormControl(0, [Validators.required, Validators.pattern('^.+$')])
      })
    );
  }

  onCancel(){
    this.router.navigate(['../', {relativeTo:this.route}]);
  }

  onRemoveIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm(){
    this.recipeForm = new FormGroup(this.currentRecipe);
  }

  getIngredients(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  ngOnDestroy() {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
