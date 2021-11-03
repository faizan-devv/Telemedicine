import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  get(operation: string) {
    const headerInfo = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    // REQUEST AND RETURN TO CALLING METHOD
    let obj : Observable<any> = 
      this.http.get(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/${operation}`, headerInfo)
      .pipe(
        catchError( err => {
          console.log(err);
          return throwError('Error Occured in GET');
        })
      )
    return obj;
  }
  
  post(operation: string, body: Object) {
    const headerInfo = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    // REQUEST AND RETURN TO CALLING METHOD
    let obj : Observable<any> = 
      this.http.post(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/${operation}`, body, headerInfo)
      .pipe(
        catchError( err => {
          console.log(err);
          return throwError('Error Occured in POST');
        })
      )
    return obj;
  }

  getFullUrl(url: string) {
    const headerInfo = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    // REQUEST AND RETURN TO CALLING METHOD
    let obj : Observable<any> = 
      this.http.get(url, headerInfo)
      .pipe(
        catchError( err => {
          console.log(err);
          return throwError('Error Occured in GET');
        })
      )
    return obj;
  }
  
  postFullUrl(url: string, body: Object) {
    const headerInfo = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    // REQUEST AND RETURN TO CALLING METHOD
    let obj : Observable<any> = 
      this.http.post(url, body, headerInfo)
      .pipe(
        catchError( err => {
          console.log(err);
          return throwError('Error Occured in POST');
        })
      )
    return obj;
  }
}
