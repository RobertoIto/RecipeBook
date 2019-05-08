import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  susbcript: Subscription;

  constructor(private shoppingListService: ShoppingListService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    // Get the ingredients data from the database
    this.dataStorageService.getShoppingList();

    // Here we populate the ingredients with the ingredients array.
    this.ingredients = this.shoppingListService.getIngredients();

    // We will subscribe to the method that will update our ingredients
    // array.
    this.susbcript =
      this.shoppingListService.ingredientsChanged.subscribe(
        (ingr: Ingredient[]) => {
          this.ingredients = ingr;
        }
      );
  }

  onEditItem(index: number) {
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.susbcript.unsubscribe();
  }
}

