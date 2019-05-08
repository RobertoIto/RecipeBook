import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../auth/auth-guard.service';
import { ShoppingListComponent } from './shopping-list.component';

const shoppingRoutes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent,
      canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(shoppingRoutes)],
  exports: [RouterModule]
})

export class ShoppingListRoutingModule { }
