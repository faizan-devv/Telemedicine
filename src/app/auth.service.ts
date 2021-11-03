import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { VisitService } from './PatientDash/Visit.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private _router: Router, private visit: VisitService){}

  // ...
    public isAuthenticated(): boolean {
        let timeout: Date;
        if(localStorage.getItem('SESSION_TIMEOUT')){
            timeout = new Date(Date.parse(localStorage.getItem('SESSION_TIMEOUT')));
            if(timeout < new Date()){
                this.logout();
            } else {
                localStorage.setItem('SESSION_TIMEOUT', new Date(new Date().getTime() + 60 * 60000).toISOString());
            }
        }
        let user_key = localStorage.getItem('SESSION_ID');
        if(!user_key){
            return false;
        }
        return true;
    }

    login(username: string, password: string){
        // SET UP INFORMATION FOR HEADER
        let userpass: string = username + ':' + password;
        const headerInfo = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + btoa(userpass)
            })
        };

        // REQUEST AND RETURN TO CALLING METHOD
        let obj : Observable<any> = this.http.get(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/session`, headerInfo);
        return obj;
    }

    logout() {
        if(localStorage.getItem('VISIT_ID')){
            this.visit.endVisit(new Object({
                'stopDatetime': new Date().toISOString()
            })).subscribe(res => {
                console.log('VISIT ENDED'); 
                if(!!res.error){
                    console.error(res.error);
                } else {   
                    localStorage.clear();
                    this._router.navigate(['/login']);
                }
            })
        } else {
            localStorage.clear();
            this._router.navigate(['/login']);
        }
        
    }

    getUserInfo(){
        const headerInfo = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + btoa('admin:Admin123')
            })
        };

        // REQUEST AND RETURN TO CALLING METHOD
        let obj : Observable<any> = this.http.get(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/user/${localStorage.getItem('USER_ID')}`, headerInfo);
        return obj;
    }
}