import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard.service';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

// IMPORTANT: ALL THE PATHS MUST BE IN A LOGICAL SEQUENCE OR
// ANGULAR WILL NOT UNDERSTAND. For example. if the path 'new' is
// below the path ':index' we will got an error.
// The component is the same for the edit and new recipe.
// Line commented because we are using lazy loading with the
// app-routing.module. The recipes path must be empty.
const recipesRoutes: Routes = [
  // { path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard], children: [
  { path: '', component: RecipesComponent, canActivate: [AuthGuard], children: [
    { path: '', component: RecipeStartComponent, canActivate: [AuthGuard] },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    { path: ':index', component: RecipeDetailComponent, canActivate: [AuthGuard] },
    { path: ':index/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
  ]}
];

// In the imports, we have to reference to forChild, only the app.module
// will use the forRoot.
@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
