import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Recipe 1', 'desc 1', 'https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/image/lighten-up-america/pasta-vodka-cream-sauce-ck-x.jpg?itok=eXI12jm5'),
    new Recipe('Recipe 2', 'desc 2', 'https://bmexdi064h-flywheel.netdna-ssl.com/wp-content/uploads/2018/11/Roasted-Turkey-Breast-foodiecrush.com-025.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
