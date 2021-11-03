import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientPortalLoginService {

constructor(private http: HttpClient) { }

getAllPatients(str: string) {
  const headerInfo = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('admin:Admin123')
    })
  };

  // REQUEST AND RETURN TO CALLING METHOD
  let obj : Observable<any> = this.http.get(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/patient?q=${str}`,headerInfo);
  return obj;
}

}
