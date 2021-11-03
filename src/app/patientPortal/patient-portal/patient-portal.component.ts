import { Component, OnInit } from '@angular/core';
import { PatientPortalLoginService } from './PatientPortalLogin.service';
import { PatientAuthService } from 'app/pat-auth.service';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-patient-portal',
  templateUrl: './patient-portal.component.html',
  styleUrls: ['./patient-portal.component.css']
})
export class PatientPortalComponent implements OnInit {

  username: string;
  password: string;
  isLoginSuccess: string;
  patients: string[][];
  search: string;
  error: string;

  constructor(private patientService: PatientPortalLoginService, private _router: Router, private auth: PatientAuthService) { }

  ngOnInit() {
  }

  login(){
    this.search = _.escape(this.search);
    this.password = _.escape(this.password);
    let hasPassword = false;
    console.log("USER ID:", this.username);
    this.auth.validatePassword(this.username).subscribe(res => {
      res.results.forEach(item => {
        if(item.attributeType.uuid === '76c5849d-1888-41a0-a3d9-f7b3c5df3050'){
          hasPassword = true;
          if(this.password === item.value){
            localStorage.setItem('PP_PATIENT_ID', this.username);
            this._router.navigate(['/patientportal/dash']);
          } else {
            alert("Invalid Password")
          }
        }
        if(!hasPassword) {
          console.log("SETTING PASS");
          this.auth.setPassword(
            this.username,
            new Object({
              attributeType: '76c5849d-1888-41a0-a3d9-f7b3c5df3050',
              value: this.password
          })).subscribe(response => {
            console.log("PASSWORD SET: ", response);
              localStorage.setItem('PP_PATIENT_ID', this.username);
              this._router.navigate(['/patientportal/dash']);
            },
            error => {
              this.error = "ERROR IN SYSTEM";
            }
          );
        }
      });
    },
    err => {
      console.error(err);
      
    });

  }

  getAllPatients() {
    let sel = <HTMLInputElement> document.querySelector('#username');
    sel.innerHTML = '';
    let opt = document.createElement('option');
    opt.value = "";
    opt.appendChild(document.createTextNode("Please Select One..."));
    sel.appendChild(opt);
    this.patientService.getAllPatients(this.search).subscribe(res => {
      if(!res.error){
        res.results.forEach(patient => {
          let opt1 = document.createElement('option');
          opt1.value = patient.uuid;
          opt1.appendChild(document.createTextNode(patient.display));
          sel.appendChild(opt1);
        });
        sel.disabled = false;
      }
    });
  }

}
