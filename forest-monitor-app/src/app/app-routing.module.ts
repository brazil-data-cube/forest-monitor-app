import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ExploreComponent} from './pages/explore/explore.component';

const routes: Routes = [
  { path: 'explore', component: ExploreComponent },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule'},
  { path: '*', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' }
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
