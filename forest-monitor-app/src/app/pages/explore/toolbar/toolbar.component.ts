import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthState } from '../../auth/auth.state';
import { Store, select } from '@ngrx/store';
import { Logout } from '../../auth/auth.action';

/**
 * Toolbar component
 * top menu of the explore page
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  /** if is logged */
  public logged = false;

  /** subscribe in store */
  constructor(
    private store: Store<AuthState>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public router: Router) { 
      this.store.pipe(select('auth')).subscribe(res => {
        this.logged = res.userId && res.token;
      });
    }

  /** pointer to issue event to explore component */
  @Output() toggleToEmit = new EventEmitter();

  /**
   * emit event to explore when click in menu icon
   */
  toggleDrawer() {
    this.toggleToEmit.emit();
  }

  /**
	 * Logout in application
	 */
	logout() {
		this.logged = false;
		this.store.dispatch(Logout());
		this.snackBar.open('Logout Successfully!', '', {
			duration: 2000,
			verticalPosition: 'top',
			panelClass: 'app_snack-bar-success'
		});
  	}
}
