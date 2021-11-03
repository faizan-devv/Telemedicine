import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const Concept = {
  'height': "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  'weight': "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  'bmi': '9e294ce8-c8ae-4c11-934b-9a5534aeef93',
  'sys_bp': '5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  'dia_bp': '5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  'temp': '5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  'pulse': '5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
};

@Injectable({
  providedIn: 'root'
})
export class CheifComplaintService {

  obs_generated: string[];

  constructor(private http: HttpClient) { }

  createEncounter(post_body: Object){
    
    // SET UP INFORMATION FOR HEADER
    const headerInfo = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    // REQUEST AND RETURN TO CALLING METHOD
    let obj : Observable<any> = this.http.post(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/encounter/`, JSON.stringify(post_body), headerInfo);
    console.log(obj);
    
    return obj;
  }

  addEncounterProvider(uuid: string, post_body: Object){
    
    // SET UP INFORMATION FOR HEADER
    const headerInfo = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    // REQUEST AND RETURN TO CALLING METHOD
    let obj : Observable<any> = this.http.post(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/encounter/${uuid}/encounterprovider`, JSON.stringify(post_body), headerInfo);
    console.log(obj);
    
    return obj;
  }
}
