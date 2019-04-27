import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    // Here we populate the ingredients with the ingredients array.
    this.ingredients = this.shoppingListService.getIngredients();

    // We will subscribe to the method that will update our ingredients
    // array.
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingr: Ingredient[]) => {
        this.ingredients = ingr;
      }
    );
  }

}

