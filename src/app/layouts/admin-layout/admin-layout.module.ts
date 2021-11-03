import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { XYZComponent } from 'app/XYZ/XYZ.component';
import { AcquireVitalsComponent } from 'app/AcquireVitals/AcquireVitals.component';
import { PatientDashComponent } from 'app/PatientDash/patient-dash.component';
import { ChiefComplaintComponent } from 'app/ChiefComplaint/chief-complaint.component';
import { AddPatientComponent } from 'app/add-patient/add-patient.component';
import { VisitComponent } from 'app/visit/visit.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    XYZComponent,
    AcquireVitalsComponent,
    PatientDashComponent,
    ChiefComplaintComponent,
    AddPatientComponent,
    VisitComponent
  ]
})
export class AdminLayoutModule {}
