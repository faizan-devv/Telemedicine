import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddPatientService {

constructor(private http?: HttpClient) { }

  createPerson(person: Object): Observable<any> {
  
    // SET UP INFORMATION FOR HEADER
    const headerInfo = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    // REQUEST AND RETURN TO CALLING METHOD / RETURNS AN OBSERVABLE WITH THE PERSON OBJECT
    console.log(JSON.stringify(person));
    let obj : Observable<any> = this.http.post(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/person`, JSON.stringify(person), headerInfo);
    return obj;
  }

  createPatient(patient: Object): Observable<any> {
  
    // SET UP INFORMATION FOR HEADER
    const headerInfo = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('admin:Admin123')
      })
    };

    // REQUEST AND RETURN TO CALLING METHOD / RETURNS AN OBSERVABLE WITH THE PERSON OBJECT
    let obj : Observable<any> = this.http.post(`http://ekkoapp.tk:8082/openmrs/ws/rest/v1/patient/`, JSON.stringify(patient), headerInfo);
    return obj;
  }

  luhnCheckDigit(input) {
    let possible = '0123456789ACDEFGHJKLMNPRTUVWXY';
    
    let factor = 2;
    let sum = 0;
    let n = possible.length;

    for (let i = input.length - 1; i >= 0; i--) {
            let codePoint = possible.indexOf(input.charAt(i));
            let addend = factor * codePoint;
            factor = (factor == 2) ? 1 : 2;
            addend = Math.floor(addend / n) + (addend % n);
            sum += addend;
    }

    let remainder = sum % n;
    let checkCodePoint = (n - remainder) % n;

    return possible.charAt(checkCodePoint);
  }

  makeid(length) {
    let result = '';
    let characters = '0123456789ACDEFGHJKLMNPRTUVWXY';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

}
