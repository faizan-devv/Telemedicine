import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'app/request.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.component.html',
  styleUrls: ['./visit.component.scss']
})
export class VisitComponent implements OnInit {

  uuid: string;
  visit: Object;
  observations: string[] = [];

  constructor(private _route: ActivatedRoute,
    private request: RequestService) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.uuid = params['id'];
      this.request.get(`visit/${this.uuid}?v=full`).subscribe(res => {
        this.visit = res;
        console.log(res);
        if(res.encounters.length > 0){
          res.encounters.forEach(obs => {
            this.request.getFullUrl(obs.obs[0].links[0].uri).subscribe(cchpi => {
              cchpi.groupMembers.forEach(observations => {
                this.observations.push(observations.display);
                console.log(observations);
              });
            });
          });
        }
      });
    });
  }

  stopVisit() {
    this.request.post(`/visit/${this.uuid}`, new Object({
      stopDatetime: new Date().toISOString()
    })).subscribe(res => {
      console.log(res);
      this.ngOnInit();
    })
  }

}
