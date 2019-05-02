import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  susbcript: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    // Here we populate the ingredients with the ingredients array.
    this.ingredients = this.shoppingListService.getIngredients();

    // We will subscribe to the method that will update our ingredients
    // array.
    this.susbcript =
      this.shoppingListService.ingredientsChanged.subscribe(
        (ingr: Ingredient[]) => {
          this.ingredients = ingr;
          console.log(this.ingredients);
        }
      );
  }

  ngOnDestroy() {
    this.susbcript.unsubscribe();
    console.log('unsibscribed');
  }
}

