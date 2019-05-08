import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  index: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private dataStorageService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit() {
    // Created this subscription to listen when the recipe selection
    // changed. The id is the index of recipe array.
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params.index;
        this.recipe = this.recipeService.getRecipe(this.index);
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(
      this.recipe.ingredients
    );
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.index);

    // Store the data into the database.
    this.dataStorageService.storeRecipes().subscribe(
      (response) => console.log(response),
      (error)  => console.log(error)
    );

    this.router.navigate(['/recipes']);
  }

  canEditDelete() {
    const authUserEmail = this.authService.getUserEmailAlpha();

    if (this.recipe.userEmail === authUserEmail) {
      return true;
    }
    return false;
  }
}
