import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

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
        new Ingredient('pasta', 5),
        new Ingredient('tomato', 4)
      ]
    ),
    new Recipe(
      'Recipe 2',
      'desc 2',
      // tslint:disable-next-line:max-line-length
      'https://bmexdi064h-flywheel.netdna-ssl.com/wp-content/uploads/2018/11/Roasted-Turkey-Breast-foodiecrush.com-025.jpg',
      [
        new Ingredient('chicken breast', 4),
        new Ingredient('salt', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {

  }

  getRecipes() {
    // This command make a copy and return it.
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingr: Ingredient[]) {
    this.shoppingListService.addIngredients(ingr);
  }

  addRecipe(recipe: Recipe) {
    const index = this.recipes.push(recipe);
    // We are pushing to the array recipe and then we return a
    // copy to the subject recipesChanged. This is an observer so
    // itto get this, is necessary subscribe.
    this.recipesChanged.next(this.recipes.slice());
    return index - 1;
  }

  updateRecipe(index: number, newRecipe: Recipe) {
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
