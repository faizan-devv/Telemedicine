import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  constructor(private http?: HttpClient) {  }

  // TAKES UUID AS INPUT
  setVisit(post_body: Object): Observable<any> {
    
    // SET UP INFORMATION FOR HEADER
    const headerInfo = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    // REQUEST AND RETURN TO CALLING METHOD
    let obj : Observable<any> = this.http.post(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/visit`, JSON.stringify(post_body), headerInfo);
    return obj;
  }
  
  endVisit(post_body: Object): Observable<any> {
    let id: string;
    // SET UP INFORMATION FOR HEADER
    const headerInfo = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    if(localStorage.getItem('VISIT_ID')){
      id = localStorage.getItem('VISIT_ID');
    }

    // REQUEST AND RETURN TO CALLING METHOD
    let obj : Observable<any> = this.http.post(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/visit/${id}`, JSON.stringify(post_body), headerInfo);
    return obj;
  }

  listLocations() {
    const headerInfo = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    // REQUEST AND RETURN TO CALLING METHOD
    let obj : Observable<any> = this.http.get(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/location`, headerInfo);
    return obj;
  }

}
