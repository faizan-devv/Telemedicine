import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { getPatientByUUID } from "./getPatientByUUID.service";
import { Subscription, Observable } from 'rxjs/Rx';
import * as _ from "lodash";


@Component({
    selector:'xyz',
    templateUrl: './XYZ.component.html',
    styleUrls: ['./XYZ.component.css']
})

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ XYZComponent ],
    exports: [ XYZComponent ]
})

export class XYZComponent implements OnInit {

    private routeSub: Subscription;
    private uuid: string;
    constructor(private patientService: getPatientByUUID, private _route: ActivatedRoute) { }

    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    cnic: string;
    Address: string;
    city: string;
    gender: string;
    country: string;
    postalCode: number;

    errorText: string = '';
    searchResults: Observable<any>;

    ngOnInit() {
        this.routeSub = this._route.params.subscribe(params => {
            console.log(params) //log the entire params object
            console.log(params['id']) //log the value of id
            this.uuid = params['id'];
        });
        this.getUserProfile();
    }

    submit(){
        console.log("The form has been submitted");
    }

    getUserProfile() {
        this.id = _.escape(this.id);
        this.firstName = _.escape(this.firstName);
        this.lastName = _.escape(this.lastName);
        this.dateOfBirth = _.escape(this.dateOfBirth);
        this.cnic = _.escape(this.cnic);
        this.Address = _.escape(this.Address);
        this.city = _.escape(this.city);
        this.gender = _.escape(this.gender);
        this.country = _.escape(this.country);
        this.postalCode = _.escape(this.postalCode);

        this.patientService.getPatient(this.uuid).subscribe(res => {
            console.log("PAT UUID: " + this.uuid);
            console.log("Response: ", res);
        
            this.id = this.uuid;

            let person: any = res.person;
            this.firstName = person.preferredName.givenName;
            this.lastName = person.preferredName.familyName;
            
            this.dateOfBirth = new Date(person.birthdate);       
            
            person.attributes.forEach(attr => {
            if(attr.display.indexOf("CNIC") >= 0)
                this.cnic = attr.value;
            });

            if(Object.entries(person.addresses[0]).length > 0){
                for(let [key, value] of Object.entries(person.addresses[0])){
                    if(key.indexOf("address") >= 0){
                        this.Address = <string>value;
                        break;
                    }
                }
            }

            console.log(this.Address);
            this.city = person.addresses[0].cityVillage;
            this.country = person.preferredAddress.country;
            this.postalCode = person.preferredAddress.postalCode;
            
            if (res.Response == 'False') {
                this.errorText = res.Error;
            }

            this.searchResults = res.results;
        });
    }

  }
