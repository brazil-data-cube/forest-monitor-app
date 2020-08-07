import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class MonitorService {
   

    private urlForestAPI = window['__env'].urlForestAPI;   

    /** start http service client */
    constructor(private http: HttpClient, private snackBar:MatSnackBar) { }
        showMessage(msg:string) : void {
        this.snackBar.open(msg, '',{
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
            })

    }
    public async add(data: object, token: string): Promise<any> {
        const urlSuffix = `/monitor/`;
        const response = await this.http.post(`${this.urlForestAPI}${urlSuffix}`, data, {
           
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).toPromise();
        return response;
        console.log(this.add)
    }

    public async del(id: object, token: string): Promise<any> {
        const urlSuffix = `/monitor/${id}`;
        console.log(urlSuffix);
        
        const response = await this.http.delete(`${this.urlForestAPI}${urlSuffix}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).toPromise();       
        return response; 
        console.log(response)
    
    }    

    public async readById( id:string,  token: string): Promise<any> {
        
        const urlSuffix = `/monitor/${id}`;
        const response = await this.http.get(`${this.urlForestAPI}${urlSuffix}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            }).toPromise();
        return response;
    }
    public async update(id: object, token: string): Promise<any> {
        
        const urlSuffix = `/monitor/${id}`;
        const response = await this.http.put(`${this.urlForestAPI}${urlSuffix}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
            }).toPromise();
        return response;
    }



    } 
      
       


  
  
    

//console.log(this.data);
