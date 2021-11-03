import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientPortalComponent } from 'app/patientPortal/patient-portal/patient-portal.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PatientLayoutRoutes } from './patient-layout.routing';
import { LbdModule } from 'app/lbd/lbd.module';
import { NguiMapModule } from '@ngui/map';
import { PatientPortalDashComponent } from 'app/PatientPortalDash/PatientPortalDash.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PatientLayoutRoutes),
    FormsModule,
    LbdModule
  ],
  declarations: [
    PatientPortalComponent,
    PatientPortalDashComponent
  ]
})
export class PatientLayoutModule { }
