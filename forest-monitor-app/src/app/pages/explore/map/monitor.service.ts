import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MonitorService {

    private urlForestAPI = window['__env'].urlForestAPI;

    /** start http service client */
    constructor(private http: HttpClient) { }

    public async add(data: object, token: string): Promise<any> {
        const urlSuffix = `/monitor/`;
        const response = await this.http.post(`${this.urlForestAPI}${urlSuffix}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).toPromise();
        return response;
    }

    public async del(id: object, token: string): Promise<any> {
        const urlSuffix = `/monitor/${id}`;
        const response = await this.http.delete(`${this.urlForestAPI}${urlSuffix}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).toPromise();
        return response;
    }

}
