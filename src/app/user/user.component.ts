import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { SearchPatientService } from './SearchPatient.service';
import { Subscription } from 'rxjs';
import * as _ from "lodash";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
              private _router: Router, 
              private appService: SearchPatientService
  ) { 

  }
  id:number=5;
  id1:number=0;
  title = '';
  searchResults = [];
  isResultEmpty: boolean = false;
  errorText = '';
  ngOnInit() {
    
  }
  search() {
    this.title = _.escape(this.title);
    this.appService.getPatient(this.title).subscribe(res => {
      //console.log(res);
      if (res.results.length == 0) {
        this.errorText = res.Error;
        this.isResultEmpty = true;
      } else {
        this.isResultEmpty = false;
      }

      this.searchResults = res.results;
    })
    //console.log(this.searchResults);
  }
  
}
