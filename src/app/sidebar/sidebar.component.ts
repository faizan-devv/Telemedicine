import { Component, OnInit } from '@angular/core';
import { PatientDataService } from 'app/PatientData/patient-data.service';
import { SidebarService } from './sidebar.service';
import { AuthService } from 'app/auth.service';
import { RequestService } from 'app/request.service';

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

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  patientId: string;
  username: string;

  constructor(private menuService: SidebarService, private auth: AuthService, private request: RequestService) { }

  ngOnInit() {
    this.patientId = localStorage.getItem('PATIENT_ID');
    this.menuItems = this.menuService.menu_select();
    window.onresize = () => {
      this.isMobileMenu();
    }
    this.request.get('user/' + localStorage.getItem('USER_ID')).subscribe(
      res => this.username = res.person.display,
      err => {console.error('User not found. Error:', err); console.log(localStorage.getItem('USER_ID'))}
    );
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout() {
    this.auth.logout();
  }

  
}
