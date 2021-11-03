import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth.service';
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  isLoginSuccess: boolean = true;

  constructor(private authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    this.username = _.escape(this.username);
    this.password = _.escape(this.password);
    let loginBtn = document.querySelector("button");
    loginBtn.disabled = true;
    this.authService.login(this.username, this.password).subscribe(res => {
      console.log("LOGIN RES", res);
      
      if(res.authenticated === false){
        this.isLoginSuccess = false;
        loginBtn.disabled = false;
      } else {
        if(!!res.sessionId) {
          let timeout = new Date(new Date().getTime() + 60 * 60000); // 60 minutes
          localStorage.setItem('SESSION_ID', res.sessionId);
          localStorage.setItem('SESSION_TIMEOUT', timeout.toISOString());
          localStorage.setItem('USER_ID', res.user.uuid);
          this._router.navigate(['/dashboard']);
        }
      }
    },
    err => alert("Invalid Login/Password")
    );
  }

}
