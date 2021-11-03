import { Component, OnInit, NgModule } from '@angular/core';
import { AcquireVitalsService } from './AcquireVitals.service';
import { Router } from '@angular/router';

@Component({
    selector:'AcquireVitals',
    templateUrl:'./AcquireVitals.component.html'
})

export class AcquireVitalsComponent implements OnInit
{
    private obsUUID: string[] = [];

    height: string;
    weight: string;
    bmi: string;
    sys_bp: string;
    dia_bp: string;
    temp: string;
    pulse: string;
    patient_id: string;
    noVisit: boolean = false;
    
    alertMessage: string = "";

    constructor(private vitalsService: AcquireVitalsService, private _router: Router){}

    ngOnInit() {
        this.patient_id = localStorage.getItem('PATIENT_ID');
        if(localStorage.getItem('VISIT_ID') === null){
            this.noVisit = true;
        } else {
            this.noVisit = false;
        }
    }

    aquireVitals() {
        this.alertMessage = "Please Wait...";

        if(localStorage.getItem('VISIT_ID') !== null){
            console.log("SENDING OBS CREATING REQ");
            let obj: Object = {
                encounterProviders: [
                    {
                        encounterRole: "240b26f9-dd88-4172-823d-4a8bfeb7841f",
                        provider: "ad45b642-5f51-444f-ae6d-4db4a0627b9c",
                        encounter: "Acquire Vitals"
                    }
                ],
                encounterType: "67a71486-1a54-468f-ac3e-7091a9a79584",
                form: "7c85cf20-1708-4182-8baf-a805b765929e",
                location: "6351fcf4-e311-4a19-90f9-35667d99a8af",
                obs: [
                    {
                        concept: "58462c81-21be-41ea-8f18-970920069446",
                        groupMembers: [
                            {concept: "5090AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", value: this.height},
                            {concept: "5089AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", value: this.weight},
                            {concept: "9e294ce8-c8ae-4c11-934b-9a5534aeef93", value: this.bmi},
                            {concept: "5085AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", value: this.sys_bp},
                            {concept: "5086AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", value: this.dia_bp},
                            {concept: "5088AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", value: this.temp},
                            {concept: "5087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", value: this.pulse}
                        ]
                    }
                ],
                orders:[],
                patient: localStorage.getItem('PATIENT_ID'),
                visit: localStorage.getItem('VISIT_ID')
            };

            console.log("BEFORE CREATING VITALS", obj);

            this.vitalsService.newEncounter(obj).subscribe(res => {
                if(res.ok == false)
                    console.error(res.Error);
                else {
                    console.log(res);
                }
            })
            this.alertMessage = "Done!";
            this._router.navigate(['/chiefcomplaint'])
        }
        
    }

}