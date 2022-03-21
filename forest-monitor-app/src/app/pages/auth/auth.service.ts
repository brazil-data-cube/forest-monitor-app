import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {getLocalStorageAuthKey} from '../../shared/helpers/CONSTS';

/**
 * Service to authentication
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

    /** base url of Oauth */
    private urlOauth = window['__env'].urlOauth;
    private applicationName = window['__env'].appName;

    /** start http service client */
    constructor(private http: HttpClient) { }

    /**
     * get Token in DPI Oauth
     */
    public async token(scope: string): Promise<any> {
        const urlSuffix = `/auth/token?service=${this.applicationName}&scope=${scope}`;
        const authenticationToken = localStorage.getItem(getLocalStorageAuthKey()) ? JSON.parse(localStorage.getItem(getLocalStorageAuthKey()))['token'] : '';
        const response = await this.http.get(`${this.urlOauth}${urlSuffix}`, {
            headers: {
                Authorization: `Bearer ${authenticationToken}`
            }
        }).toPromise();
        return response;
    }

    public logout(router: Router) {

        localStorage.removeItem(getLocalStorageAuthKey());
        const basePath = '/' + `${window['__env'].basePath}`;
        document.location.href = basePath;
    }

  /**
   * Check if auth token is still valid
   */
  public async checkAuthPost() {
        try {
          const response = await this.token(`${this.applicationName}:manage:POST`);
        } catch (err) {
            return false;
        }
        return true;
    }
}
