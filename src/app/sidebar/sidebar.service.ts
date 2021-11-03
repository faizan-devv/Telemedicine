import { Injectable } from "@angular/core";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/patient', title: 'Patient',  icon:'pe-7s-user', class: '' },
    { path: '/patient/new', title: 'Patient Registration',  icon: 'pe-7s-note2', class: '' },
    { path: '/AcquireVitals', title: 'Acquire Vitals',  icon: 'pe-7s-note2', class: '' },
    { path: '/chiefcomplaint', title: 'Chief Complaint',  icon: 'pe-7s-note2', class: '' }
];

export const ROUTES_ALT: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
  { path: '/patient', title: 'Patient',  icon:'pe-7s-user', class: '' },
  { path: '/patient/new', title: 'Patient Registration',  icon: 'pe-7s-note2', class: '' }
];

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    constructor() {  }

    menu_select(){
        if(localStorage.getItem('PATIENT_ID') === null)
            return ROUTES_ALT.filter(menuItem => menuItem);
        else
            return ROUTES.filter(menuItem => menuItem);
    }
}