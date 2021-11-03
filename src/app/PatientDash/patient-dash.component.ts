import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { XYZComponent } from 'app/XYZ/XYZ.component';
import { getPatientByUUID } from 'app/XYZ/getPatientByUUID.service';
import { VisitService } from './Visit.service';


@Component({
  selector:'pd',
  templateUrl: './patient-dash-demo.component.html',
  styleUrls: ['./patient-dash.component.css']
})

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ XYZComponent ],
    exports: [ XYZComponent ]
})
export class PatientDashComponent implements OnInit {
  private routeSub: Subscription;
  private uuid: string;

  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  cnic: string;
  Address: Object;
  city: string;
  country: string;
  postalCode: number;

  locationList: string[][];
  location: string;

  errorText: string = '';
  searchResults: Observable<any>;

  isVisitStarted: boolean = false;
  
  constructor(private _route: ActivatedRoute, 
    private patientService: getPatientByUUID, 
    private visit: VisitService, 
    private _router: Router) { }

  ngOnInit() {
    this.routeSub = this._route.params.subscribe(params => this.uuid = params['id']);
    this.getUserProfile();
    this.isVisitStarted = localStorage.getItem('IS_VISIT_STARTED') === "true" ? true : false;
    if(!this.isVisitStarted){
      this.visit.listLocations().subscribe(res => {
        let sel = document.querySelector('#location');
        res.results.forEach(item => {
          let opt = document.createElement('option');
          opt.value = item.uuid;
          opt.appendChild(document.createTextNode(item.display));
          sel.appendChild(opt);
        });
      });
    }
  }

  startVisit(){
    localStorage.setItem('PATIENT_ID', this.uuid);
    this.isVisitStarted = true;
    this.visit.setVisit(new Object({
      'patient': this.uuid,
      'visitType': "7b0f5697-27e3-40c4-8bae-f4049abfb4ed",
      location: this.location
    })).subscribe(res => {
      localStorage.setItem('VISIT_ID', res.uuid);
      console.log(res);
      localStorage.setItem('IS_VISIT_STARTED', "true");
      setTimeout(() => {
        location.reload();
      }, 3000);
    })
  }

  endVisit() {
    localStorage.removeItem('PATIENT_ID');
    this.isVisitStarted = false;
    localStorage.removeItem('IS_VISIT_STARTED');
    this.visit.endVisit(new Object({
      'stopDatetime': new Date().toISOString()
    })).subscribe(res => {
      console.log(res);
      console.log('VISIT ENDED'); 
      if(res.ok == false){
        console.error(res.error);
      } else {   
        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    })
  }

  getUserProfile() {
    console.log("HERE");
    
    console.log(this.uuid);
    this.patientService.getPatient(this.uuid).subscribe(res => {
        console.log("PAT UUID: " + this.uuid);
        console.log("Response: ");
        console.log(res);
        
        // ADD ANY INFORMATION YOU WANT HERE

        this.id = this.uuid;

        let person: any = res.person;
        this.firstName = person.preferredName.givenName;
        this.lastName = person.preferredName.familyName;
        
        let dob = new Date(person.birthdate);       
        this.dateOfBirth = dob.getDate() + "-"; 
        this.dateOfBirth += dob.getMonth() + "-"; 
        this.dateOfBirth += dob.getFullYear(); 
        
        person.attributes.forEach(attr => {
          if(attr.display.indexOf("CNIC") >= 0)
            this.cnic = attr.value;
        });

        this.Address = new Object();
        let address = person.preferredAddress;
        if(address != null){
          for(let [key, value] of Object.entries(address)){
            let key1: string = <string> key;
            let newvalue = ""
            if (value == "" || value == null)
                newvalue = "-"
            else 
                newvalue = <string>value;
            if (key1.indexOf("address") >= 0 && value != null)
              this.Address[key] = value;    
          }
        }
        console.log(this.Address);
        if(person.preferredAddress){
          this.city = person.preferredAddress.cityVillage ? person.preferredAddress.cityVillage : "";
          this.country = person.preferredAddress.country ? person.preferredAddress.country : "";
          this.postalCode = person.preferredAddress.postalCode ? person.preferredAddress.postalCode : "";
        }
        
        if (res.Response == 'False') {
          this.errorText = res.Error;
        }

        this.searchResults = res.results;
    });
  }  

}
