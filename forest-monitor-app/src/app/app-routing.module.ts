import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreComponent } from './pages/explore/explore.component';
import { EditableComponent } from './pages/explore/map/editable/editable.component';

const routes: Routes = [
  { path: 'explore', component: ExploreComponent },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule'},
  { path: '*', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'explore', pathMatch: 'full' }
];

/**
 * External Route Module (main)
 * has call to the explorer, authentication and administrator modules
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
