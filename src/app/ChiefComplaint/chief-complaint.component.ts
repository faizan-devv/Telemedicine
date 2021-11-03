import { Component, OnInit, NgModule } from '@angular/core';
import { CheifComplaintService } from './cheif-complaint.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  templateUrl: './chief-complaint.component.html',
  styleUrls: ['./chief-complaint.component.css']
})

export class ChiefComplaintComponent implements OnInit {

  patient_id: string = localStorage.getItem('PATIENT_ID');
  noVisit: boolean = false;
  obs: Object = {};
  isUpdated: boolean = false;
  w = window;

  alertMessage: string;
  cc: string;
  hpi: string;

  constructor(private ccService: CheifComplaintService, private _router: Router) { }
  
  ngOnInit() {
    if(localStorage.getItem('VISIT_ID') === null)
      this.noVisit = true;
    else
      this.noVisit = false;
  }

  getCcHpi() {
    this.cc = _.escape(this.cc);
    this.hpi = _.escape(this.hpi);
    this.alertMessage = "Please Wait...";

    if(localStorage.getItem('VISIT_ID') !== null){
        console.log("SENDING OBS CREATING REQ");
        let obj: Object = {
          encounterProviders: [
            {
              encounterRole: "240b26f9-dd88-4172-823d-4a8bfeb7841f",
              provider: "ad45b642-5f51-444f-ae6d-4db4a0627b9c",
              encounter: "CC/HPI"
            }
          ],
          encounterType: "b7d231d3-985e-46f3-9ac3-9c7ef86a0e09",
          form: "716e4f31-30ec-4a2a-ae89-31c8f44ebf7f",
          location: "6351fcf4-e311-4a19-90f9-35667d99a8af",
          obs: [
              {
                  concept: "fc7824fb-c1ff-4f52-8953-8e3ce6dc1a36",
                  groupMembers: [
                      {concept: "caffb81f-117e-4196-aa33-5ad78057f8b0", value: this.cc},
                      {concept: "8cfa6a09-ba80-44a6-86ba-729e285bcfcc", value: this.hpi}
                  ]
              }
          ],
          orders:[],
          patient: localStorage.getItem('PATIENT_ID'),
          visit: localStorage.getItem('VISIT_ID')
        };

        console.log("BEFORE CREATING CC/HPI", obj);

        this.ccService.createEncounter(obj).subscribe(res => {
            if(res.ok == false)
                console.error(res.Error);
            else {
                console.log("Got Observable: ", res);
                // let obj: Object = {
                //   encounterRole: "240b26f9-dd88-4172-823d-4a8bfeb7841f",
                //   provider: "ad45b642-5f51-444f-ae6d-4db4a0627b9c",
                //   encounter: "CC/HPI"
                // };
                // this.ccService.addEncounterProvider(res.uuid, obj).subscribe(providerRes => {
                //   console.log("Got Observable: ", providerRes);
                // });
                this.isUpdated = true;
            }
        })
        this.alertMessage = "Done!";
    }

  }

  startCall(): void {
    window.open(`https://localhost:3000/${this.patient_id}`, '_blank');
  }
  
}
