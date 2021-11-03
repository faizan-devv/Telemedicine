import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { VisitService } from './PatientDash/Visit.service';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PatientAuthService {

    constructor(private http: HttpClient, private _router: Router, private visit: VisitService){}

  // ...
    public isAuthenticated(): boolean {
        if(localStorage.getItem('PP_PATIENT_ID')) {
            return true;
        }
        return false;
    }

    private handleError<T>(result?: T) {
        return (error: any): Observable<T> => {      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

    validatePassword(person_uuid: string) {
        const headerInfo = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Basic ' + btoa('admin:Admin123')
          })
        };
      
        // REQUEST AND RETURN TO CALLING METHOD
        let obj : Observable<any> = this.http.get(
            `http://ekkoapp.tk:8082/openmrs/ws/rest/v1/person/${person_uuid}/attribute`,
            headerInfo
            );
        return obj;
    }
      
    setPassword(person_uuid: string, post_body: Object) {
        const headerInfo = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'Basic ' + btoa('admin:Admin123')
            })
        };
    
        // REQUEST AND RETURN TO CALLING METHOD
        let obj : Observable<any> = this.http.post(
                `http://ekkoapp.tk:8082/openmrs/ws/rest/v1/person/${person_uuid}/attribute`, 
                post_body, 
                headerInfo
            );
        return obj;
    }

    logout() {
        localStorage.clear();
        this._router.navigate(['/patientportal/login']);
    }
}