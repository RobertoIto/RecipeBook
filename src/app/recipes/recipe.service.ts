import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    // tslint:disable-next-line:max-line-length
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
    // tslint:disable-next-line:max-line-length
    new Recipe(
      'Recipe 2',
      'desc 2',
      'https://bmexdi064h-flywheel.netdna-ssl.com/wp-content/uploads/2018/11/Roasted-Turkey-Breast-foodiecrush.com-025.jpg',
      [
        new Ingredient('chicken breast', 4),
        new Ingredient('salt', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    // This command make a copy and return it.
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingr: Ingredient[]) {
    this.shoppingListService.addIngredients(ingr);
  }

}
