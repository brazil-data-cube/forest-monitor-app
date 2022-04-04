import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({providedIn: 'root'})

export class MonitorService {


  private urlForestAPI = window['__env'].urlForestAPI;

  /** start http service client */
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  public async add(data: object, token: string): Promise<any> {
    const urlSuffix = `/monitor/add`;
    const response = await this.http.post(`${this.urlForestAPI}${urlSuffix}`, data, {

      headers: {
        Authorization: `Bearer ${token}`
      }
    }).toPromise();
    return response;
  }

  public async del(id: object, token: string): Promise<any> {
    const urlSuffix = `/monitor/delete/${id}`;

    const response = await this.http.delete(`${this.urlForestAPI}${urlSuffix}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).toPromise();
    return response;
  }

  public async readById(id: string, token: string): Promise<any> {

    const urlSuffix = `/monitor/get/${id}`;
    const response = await this.http.get(`${this.urlForestAPI}${urlSuffix}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).toPromise();
    return response;
  }

  public async update(id: string, data: object, token: string): Promise<any> {

    const urlSuffix = `/monitor/update/${id}`;
    const response = await this.http.post(`${this.urlForestAPI}${urlSuffix}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).toPromise();
    return response;
  }

  public async split(id: string, data: object, token: string): Promise<any> {

    const urlSuffix = `/monitor/split/${id}`;
    const response = await this.http.post(`${this.urlForestAPI}${urlSuffix}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).toPromise();
    return response;
  }
}
