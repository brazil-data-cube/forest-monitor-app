import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreModule } from './pages/explore/explore.module';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './pages/auth/auth.module';
import * as fromApp from './app.reducer';
import * as fromAuth from './pages/auth/auth.reducer';
import * as fromExplore from './pages/explore/explore.reducer';

/**
 * Initial Module of Application (SPA)
 */
@NgModule({
  providers: [],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    ExploreModule,
    AuthModule,
    StoreModule.forRoot({
      app: fromApp.reducer,
      auth: fromAuth.reducer,
      explore: fromExplore.reducer,
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
