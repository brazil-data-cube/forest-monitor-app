import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from './app.state';
import { NgxSpinnerService } from 'ngx-spinner';

/**
 * First application component
 * has only 'router-outlet'
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  /** subscribe in store app */
  constructor(private store: Store<AppState>, private spinner: NgxSpinnerService) {
    this.store.pipe(select('app')).subscribe(res => {
      if (res.loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
