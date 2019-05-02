import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingr: Ingredient) {
    this.ingredients.push(ingr);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingr: Ingredient[]) {
    // ES6 feature, spread operator ... allow us to turn an array of
    // elements into a list of single elements.
    this.ingredients.push(...ingr);

    // We call the update method to keep our copy of the ingredients
    // array updated with the last 'version'.
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
