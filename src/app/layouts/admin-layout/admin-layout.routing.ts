import { Routes, RouterModule } from '@angular/router';

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


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',            component: HomeComponent},
    { path: 'patient/:id/edit',     component: XYZComponent, pathMatch: 'full'},
    { path: 'patient/new',          component: AddPatientComponent, pathMatch: 'full'},
    { path: 'patient',              component: UserComponent, pathMatch: 'full'},
    { path: 'AcquireVitals',        component: AcquireVitalsComponent},
    { path: 'patient/:id',          component: PatientDashComponent, pathMatch: 'full'},
    { path: 'chiefcomplaint',       component: ChiefComplaintComponent},
    { path: 'visit/:id',            component: VisitComponent},
];
