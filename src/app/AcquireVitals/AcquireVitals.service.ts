import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcquireVitalsService {

obs_generated: string[];

constructor(private http: HttpClient) { }

newEncounter(post_body: Object){
  
  // SET UP INFORMATION FOR HEADER
  const headerInfo = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('admin:Admin123')
    })
  };

  // REQUEST AND RETURN TO CALLING METHOD
  let obj : Observable<any> = this.http.post(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/encounter/`, JSON.stringify(post_body), headerInfo);
  return obj;
}

}
