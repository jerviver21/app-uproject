import  * as ShoppingListActions  from "./shopping-list.actions";
import { Ingredient } from "../../shared/ingredient.model";

export interface FeatureState {
    shoppingList: State
}

export interface State {
    ingredients: Map<number, Ingredient>
    editedIngredient: Ingredient
}

const initialState =    {
                            ingredients: new Map<number, Ingredient>(),
                            editedIngredient : new Ingredient(null, null, null)
                        };

export function shoppingListReducer(state = initialState, 
                                    action: ShoppingListActions.ShoppingListActions){
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            const copiedIngredientsAI = new Map(state.ingredients);
            if(!action.payload.id){
                action.payload.id = nextId(copiedIngredientsAI);
            }
            copiedIngredientsAI.set(action.payload.id, action.payload);
            return {
                        ...state,
                        ingredients: copiedIngredientsAI,
                        editedIngredient : new Ingredient(null, null, null)
                    };
        case ShoppingListActions.START_EDIT:
            const editedIngredient = new Map(state.ingredients).get(action.payload);
            return {
                        ...state,
                        editedIngredient: editedIngredient
                    };
        case ShoppingListActions.ADD_INGREDIENTS:
            const copiedIngredientsAIs = new Map(state.ingredients);
            action.payload.forEach((ing)=>{
                ing.id = nextId(copiedIngredientsAIs);
                copiedIngredientsAIs.set(ing.id, ing);
            });
            return {
                        ...state,
                        ingredients: copiedIngredientsAIs
                    };

        case ShoppingListActions.DELETE_INGREDIENT:
            const copiedIngredientsDI = new Map(state.ingredients);
            copiedIngredientsDI.delete(action.payload);
            return {
                        ...state,
                        ingredients: copiedIngredientsDI
                    };
        default:
            return state;
        }
}

function nextId(ingredients:Map<number, Ingredient>){
    return maxId(ingredients) + 1;
}

function maxId(ingredients:Map<number, Ingredient>){
    if(ingredients.size==0){
        return 0;
    }
    let keys = Array.from( ingredients.keys() );
    return keys.reduce((a,b)=>{
        return a>b?a:b;
    });
}