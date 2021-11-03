import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchPatientService {

  constructor(private http?: HttpClient) { }
   
   
  getPatient(title: string): Observable<any> {
    let username: string='admin';
    let password: string='Admin123';
    let headers:HttpHeaders=new HttpHeaders();
    const options = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Basic ' + btoa('admin:Admin123'),
        })
    };
  
    console.log("In Service", title);
    return this.http.get(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/patient?q=${title}`,options);

  }
}
