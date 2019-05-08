import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './core/home/home.component';

// The path recipes is loaded lazyly, we pass the path # and the
// class name. In the recipes-routing.module the Recipes path must
// be changed to empty.
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes',
      loadChildren: './recipes/recipes.module#RecipesModule' }

  // { path: 'not-found', component: PageNotFoundComponent },
  // { path: '**', redirectTo: '/not-found' }
  // { path: '**', redirectTo: '/recipes' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
