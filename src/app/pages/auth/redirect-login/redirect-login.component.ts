import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/app.state';
import {Login} from '../auth.action';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * redirect login page component
 * component to receive token of the OAuth Server and redirect to a component in this application
 */
@Component({
  template: ''
})
export class RedirectLoginComponent implements OnInit {

  /**
   * declare services
   */
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar) {}

  /**
   * verify and save token then redirect to component in this application
   */
  public ngOnInit() {
    const token = this.route.snapshot.queryParams['access_token'];
    const userId = this.route.snapshot.queryParams['user_id'];
    const url = this.route.snapshot.queryParams['callback'];
    // const tokenByCookie = getCookie('oauth.obt.inpe.br').replace('oauth.obt.inpe.br', '');

    // if (!token || !userId || !url || !tokenByCookie || (token !== tokenByCookie)) {
    if (!token || !userId || !url) {
      this.snackBar.open('Error in Login!', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'app_snack-bar-error'
      });
      this.router.navigate(['/auth/login']);
    } else {
      this.store.dispatch(Login({
        userId,
        token
      }));
      this.router.navigate([url]);
      this.snackBar.open('Login Successfully!', '', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass: 'app_snack-bar-success'
      });
    }
  }
}
