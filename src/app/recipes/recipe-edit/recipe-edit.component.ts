import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  rec: Recipe;
  index: number;
  editMode = false; // False: new/insert, True: edit

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params.index;
        // If exists a parameter in our route path the params['index']
        // won't be null.
        this.editMode = params.index != null;
      }
    );
  }

}
