import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { GestureConfig } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExploreModule } from './pages/explore/explore.module';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './pages/auth/auth.module';
import * as fromApp from './app.reducer';
import * as fromAuth from './pages/auth/auth.reducer';
import * as fromExplore from './pages/explore/explore.reducer';
import { APP_BASE_HREF } from '@angular/common';

/**
 * Initial Module of Application (SPA)
 */
@NgModule({
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
    ],
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
    MatSliderModule,
    StoreModule.forRoot({
      app: fromApp.reducer,
      auth: fromAuth.reducer,
      explore: fromExplore.reducer,
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
