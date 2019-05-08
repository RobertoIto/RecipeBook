import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './core/home/home.component';

// The path recipes is loaded lazily, we pass the path # and the
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

// Above, we have the recipes that uses the lazy loading. In the
// RouterModule.forRoot, we add a new parameter that allows
// Angular to preload the lazy loading modules.
@NgModule({
  imports: [RouterModule.forRoot(
              appRoutes,
              {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
