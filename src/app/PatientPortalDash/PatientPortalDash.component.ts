import { Component, OnInit } from '@angular/core';
import { getPatientByUUID } from 'app/XYZ/getPatientByUUID.service';
import { PatientAuthService } from 'app/pat-auth.service';

@Component({
  selector: 'app-PatientPortalDash',
  templateUrl: './PatientPortalDash.component.html',
  styleUrls: ['./PatientPortalDash.component.scss']
})
export class PatientPortalDashComponent implements OnInit {

  uuid: string;

  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  cnic: string;
  Address: Object;
  city: string;
  country: string;
  postalCode: number;

  constructor(private patientService: getPatientByUUID, private auth: PatientAuthService) { }

  ngOnInit() {
    this.uuid = localStorage.getItem('PP_PATIENT_ID');
    this.getUserProfile();
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
    });
  }  

  startCall(): void {
    window.open(`https://localhost:3000/${this.uuid}`, '_blank');
  }

  logout() {
    this.auth.logout();
  }

}
