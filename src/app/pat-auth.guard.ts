import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientAuthService } from './pat-auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientAuthGuard implements CanActivate {

  constructor(private authService: PatientAuthService, private _router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isAuthenticated()){
      this._router.navigate(['/patientportal/login']);
      return false;
    }
    return true;
  }
  
}
