import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipes.actions';

export interface FeatureState {
  recipes: State
}

export interface State {
  recipes: Map<number, Recipe>
}

const initialState: State = {
  recipes: new Map<number, Recipe>()
};

export function recipesReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES):
            const recipes = new Map();
            action.payload.forEach((recipe)=>{
                recipes.set(recipe.id, recipe);
            });
            return {
                ...state,
                recipes: recipes
            };
        case (RecipeActions.ADD_RECIPE):
            const copiedRecipesAI = new Map(state.recipes);
            if(!action.payload.id){
                action.payload.id = nextId(copiedRecipesAI);
            }
            copiedRecipesAI.set(action.payload.id, action.payload);
            return {
                        ...state,
                        recipes: copiedRecipesAI
                    };
        case (RecipeActions.DELETE_RECIPE):
            const copiedRecipesDI = new Map(state.recipes);
            copiedRecipesDI.delete(action.payload);
            return {
                ...state,
                recipes: copiedRecipesDI
            };
        default:
            return state;
    }
}

function nextId(recipes:Map<number, Recipe>){
    return maxId(recipes) + 1;
}

function maxId(recipes:Map<number, Recipe>){
    if(recipes.size==0){
        return 0;
    }
    let keys = Array.from( recipes.keys() );
    return keys.reduce((a,b)=>{
        return a>b?a:b;
    });
}