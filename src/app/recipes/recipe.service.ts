import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RecipeService implements OnInit {
  // Create a new subject recipe to get the real recipe data changed
  // and return it to the outside. This subject works as an observer
  // and has a recipe array.
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Recipe 1',
      'desc 1',
      // tslint:disable-next-line:max-line-length
      'https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/image/lighten-up-america/pasta-vodka-cream-sauce-ck-x.jpg?itok=eXI12jm5',
      [
        new Ingredient('pasta', 500, 'g', 'testtestcom'),
        new Ingredient('tomato', 4, 'unit', 'testtestcom')
      ]
    ),
    new Recipe(
      'Recipe 2',
      'desc 2',
      // tslint:disable-next-line:max-line-length
      'https://bmexdi064h-flywheel.netdna-ssl.com/wp-content/uploads/2018/11/Roasted-Turkey-Breast-foodiecrush.com-025.jpg',
      [
        new Ingredient('chicken breast', 500, 'g', 'testtestcom'),
        new Ingredient('salt', 1, 'pinch', 'testtestcom')
      ]
    )
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {

  }

  getRecipes() {
    // This command make a copy and return it.
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    // If the userEmail property is empty, add the auth user email.
    if (!recipe.userEmail) {
      recipe.userEmail = this.authService.getUserEmailAlpha();
    }

    // When adding a new recipe the ingredients come without the
    // userEmail property, because we got this from the FormControls
    // so here we will add this information to all ingredients.
    for (let ingr of recipe.ingredients) {
      if (!ingr.userEmail) {
        ingr.userEmail = this.authService.getUserEmailAlpha();
      }
    }

    const index = this.recipes.push(recipe);
    // We are pushing to the array recipe and then we return a
    // copy to the subject recipesChanged. This is an observer so
    // to get this, is necessary subscribe.
    this.recipesChanged.next(this.recipes.slice());
    return index - 1;
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    const userEmail = this.authService.getUserEmailAlpha();

    // If the userEmail property is empty, add the auth user email.
    if (!newRecipe.userEmail) {
      newRecipe.userEmail = userEmail;
    }

    // When adding a new recipe the ingredients come without the
    // userEmail property, because we got this from the FormControls
    // so here we will add this information to all ingredients.
    for (let ingr of newRecipe.ingredients) {
      if (!ingr.userEmail) {
        ingr.userEmail = userEmail;
      }
    }

    this.recipes[index] = newRecipe;
    // We are pushing to the array recipe and then we return a
    // copy to the subject recipesChanged. This is an observer so
    // itto get this, is necessary subscribe.
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    // We are pushing to the array recipe and then we return a
    // copy to the subject recipesChanged. This is an observer so
    // itto get this, is necessary subscribe.
    this.recipesChanged.next(this.recipes.slice());
  }

  fetchRecipes(rec: Recipe[]) {
    this.recipes = rec;
    this.recipesChanged.next(this.recipes.slice());
  }

}
