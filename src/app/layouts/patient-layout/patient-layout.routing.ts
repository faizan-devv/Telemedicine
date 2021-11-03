import { Route, RouterModule, Routes } from '@angular/router';

import { PatientPortalComponent } from 'app/patientPortal/patient-portal/patient-portal.component';
import { PatientPortalDashComponent } from 'app/PatientPortalDash/PatientPortalDash.component';
import { PatientAuthGuard } from 'app/pat-auth.guard';

export const PatientLayoutRoutes: Routes = [
    {   
        path: '',             
        component: PatientPortalDashComponent, 
        canActivate: [PatientAuthGuard] 
    },
    
    { 
        path: 'login',        
        component: PatientPortalComponent 
    },

    { 
        path: 'dash',         
        component: PatientPortalDashComponent, 
        canActivate: [PatientAuthGuard] 
    },
];