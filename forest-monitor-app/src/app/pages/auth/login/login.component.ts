import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthState } from '../auth.state';

/**
 * login page component
 */
@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	/** declare services */
	constructor(
		private store: Store<AuthState>,
        public router: Router) {
        this.store.pipe(select('auth')).subscribe(res => {
            if (res.userId !== "" && res.token !== "") {
                this.router.navigate(['/explore']);
            }
        });
    }

    public logar() {
        const url = this.router.url;
        window.location.href = `${window['__env'].urlOauthApp}/auth/${window['__env'].appName}/login?url=${url}`;
    }

}