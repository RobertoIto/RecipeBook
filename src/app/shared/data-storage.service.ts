import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { Recipe } from '../recipes/recipe.model';
import { RecipesComponent } from '../recipes/recipes.component';
import { AuthService } from '../auth/auth.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Ingredient } from './ingredient.model';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService,
              private shoppingListService: ShoppingListService) {}

  storeRecipes() {
    const token = this.authService.getIdToken();

    return this.http.put(
      'https://recipebook-7c095.firebaseio.com/recipe.json?auth=' + token,
      this.recipeService.getRecipes()
    );
  }

  // In this mapping, we verify if all the recipes have an ingredient
  // section even if there is no ingredient. This will avoid errors if
  // some code rely on the model structure of our recipe.
  getRecipes() {
    const token = this.authService.getIdToken();

    // For the requests to the firebase, we add a parameter into the
    // URL and pass the token. ?auth=<token>
    return this.http.get(
      'https://recipebook-7c095.firebaseio.com/recipe.json?auth=' + token)
      .pipe(map(
        (res: Recipe[]) => {
          for (let recipe of res) {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
            }
          }
          return res;
        }
      ))
      .subscribe(
        (res: Recipe[]) => {
          this.recipeService.fetchRecipes(res);
        }
      );
  }

  storeShoppingList() {
    const token = this.authService.getIdToken();
    const email = this.authService.getUserEmailAlpha();

    return this.http.put(
      'https://recipebook-7c095.firebaseio.com/shoppinglist' + email + '.json?auth=' + token,
      this.shoppingListService.getIngredients()
    );
  }

  getShoppingList() {
    const token = this.authService.getIdToken();
    const email = this.authService.getUserEmailAlpha();

    // For the requests to the firebase, we add a parameter into the
    // URL and pass the token. ?auth=<token>
    return this.http.get(
      'https://recipebook-7c095.firebaseio.com/shoppinglist' + email + '.json?auth=' + token)
      .pipe(map(
        (ingr: Ingredient[]) => {
          return ingr;
        }
      ))
      .subscribe(
        (ingr: Ingredient[]) => {
          this.shoppingListService.fetchIngredients(ingr);
        }
      );
  }
}
