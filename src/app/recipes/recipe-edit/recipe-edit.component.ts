import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  rcpEditForm: FormGroup;
  index: number;
  editMode = false; // False: new/insert, True: edit

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params.index;
        // If exists a parameter in our route path the params['index']
        // won't be null.
        this.editMode = params.index != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.index);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;

      // Verify if the recipe has ingredients and if it has, create the
      // ingredients controls FormGroups one by one with the validators.
      // Each FormGroup items (FormControls) must have its own validators
      // in the creation.
      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/(?<=^| )\d+(\.\d+)?(?=$| )/)
              ]),
              unit: new FormControl(ingredient.unit, Validators.required)
            })
          );
        }
      }
    }

    // Create the form group to link with the html file and create
    // the validators. Add the ingredients FormGroup with all the
    // ingredients controls for each ingredient.
    this.rcpEditForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    });
  }

  getControls() {
    // Get a FormArray for all the ingredients controls (name and
    // amount). Into the html file, these controls are used into a
    // loop to create the ingredients controls.
    return (this.rcpEditForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    // Create dynamically a new ingredient control with name and
    // amount.
    (this.rcpEditForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/(?<=^| )\d+(\.\d+)?(?=$| )/)
        ]),
        unit: new FormControl(null, Validators.required)
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.index, this.rcpEditForm.value);
    } else {
      this.recipeService.addRecipe(this.rcpEditForm.value);
    }

    // Store the data into the database.
    this.dataStorageService.storeRecipes().subscribe(
      (response) => {}, // console.log(response),
      (error)  => console.log(error)
    );

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    // Remove the ingredients
    (this.rcpEditForm.get('ingredients') as FormArray).removeAt(index);
  }
}
