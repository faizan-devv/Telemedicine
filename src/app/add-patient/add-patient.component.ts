import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddPatientService } from './addPatient.service';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})

export class AddPatientComponent implements OnInit {

  private person_json: Object;
  private patient_json: Object;
  private person_uuid: string;
  constructor(private addPatient: AddPatientService, private _router: Router, private http: HttpClient) { }

  id: string = "T.B.D.";
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  cnic: string;
  Address: string;
  city: string;
  gender: string;
  country: string;
  postalCode: number;

  errorLine: string;

  ngOnInit() { }

  submit(){
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

    this.person_json = {
      "names": [
        {
          "givenName": this.firstName,
          "familyName": this.lastName
        }
      ],
      "gender": this.gender,
      "birthdate": this.dateOfBirth,
      "addresses": [
        {
          "preferred": true,
          "address1": this.Address,
          "cityVillage": this.city,
          "country": this.country,
          "postalCode": this.postalCode.toString()
        }
      ],
      "attributes": [
        {
          "attributeType": "90ca1bc0-8583-4062-a339-b8b224f0fbd3",
          "value": this.cnic.toString()
        }
      ]
    };

    console.log(this.person_json);
    

    this.addPatient.createPerson(this.person_json).subscribe(res => {
      if (res.Response == 'False') {
        console.error("Action Unsuccessful, Patient not created");
        this.errorLine = res.Error;
      } else {
        console.log(res);
        this.person_uuid = res.uuid;
      }

      let luhnID: string = this.addPatient.makeid(20);
      luhnID += this.addPatient.luhnCheckDigit(luhnID);

      this.patient_json = {
        "person": this.person_uuid,
        "identifiers": [
          {
            "identifier": luhnID,
            "identifierType": "05a29f94-c0ed-11e2-94be-8c13b969e334",
            "location": "9452784f-fba9-4562-8528-a3253f2b3626"
          }
        ]
      };

      console.log(this.patient_json);

      this.addPatient.createPatient(<Object>this.patient_json).subscribe(res => {

        let routeTo: string = '/patient/' + this.person_uuid;
        if(this.errorLine == undefined)
          this._router.navigate([routeTo]);

      },
      err => {
        console.error(err);
        this.errorLine = "Missing values, Action Unsuccessful";
      });
    });
  }
}
