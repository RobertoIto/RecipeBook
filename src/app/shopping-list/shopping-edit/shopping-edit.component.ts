import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('frm') shopEdtForm: NgForm ;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  ingr = {name: '', amount: ''};

  constructor(private shoppingListService: ShoppingListService,
              private dataStorageService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit() {
    this.subscription =
      this.shoppingListService.startedEditing
        .subscribe((index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);

          this.shopEdtForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onAddItem() {
    const email = this.authService.getUserEmailAlpha();

    const frmValue = this.shopEdtForm;
    const newIngredient = new Ingredient(frmValue.value.name,
                                         frmValue.value.amount,
                                         email);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    // Store the data into the database.
    this.dataStorageService.storeShoppingList().subscribe(
      (response) => console.log(response),
      (error)  => console.log(error)
    );

    this.onClear();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.shopEdtForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
