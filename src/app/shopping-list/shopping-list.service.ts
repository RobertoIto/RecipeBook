import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];
  //   new Ingredient('Apples', 5, ''),
  //   new Ingredient('Tomatoes', 10, '')
  // ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
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

  updateIngredient(index: number, ingr: Ingredient) {
    this.ingredients[index] = ingr;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    // splice delete elements into the array, if not specified the
    // number of elements, it will erase from the index to the end
    // of the array.
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  fetchIngredients(ingr: Ingredient[]) {
    this.ingredients = ingr;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
