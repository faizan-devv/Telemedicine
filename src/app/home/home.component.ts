import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { RequestService } from 'app/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  visits: Object[] = [];
  locations: Object[] = [];

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.getVisits();
    this.getLocations();
  }

  getVisits() {
    this.request.get('visit?limit=10&v=full').subscribe(res => {
      console.log(res);
      res.results.forEach(item => {
        let date = new Date(item.startDatetime);
        let startdate = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
        this.visits.push(new Object({
          uuid: item.uuid,
          visitDisplay: item.display,
          patientName: item.patient.display,
          date: startdate,
          endDatetime: item.stopDatetime,
        }));
      });      
    });
  }

  getLocations() {
    this.request.get('location').subscribe(res => {
      res.results.forEach(item => {
        this.locations.push(new Object({
          name: item.display,
          uuid: item.uuid
        }));
      })
    });
  }

}
