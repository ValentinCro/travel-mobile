import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'
import {Activity} from '../../providers/Activity'

declare var L;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  idUser: string = "6457c33b-58a0-4dcf-9a01-b5955091532e";
  activities: Activity[];
  activitiesRated : any;
  constructor(public navCtrl: NavController, public platform: Platform, public http: Http) {
    this.http.get("http://localhost:8080/test/rate/6457c33b-58a0-4dcf-9a01-b5955091532e")
      .map(response => response.json() as Activity[])
      .subscribe((result : Activity[]) => {
          this.activitiesRated = result;
        },
        err => {

        }
      );

  }

  updateRate(rate) {
    let body = rate;

    this.http.post("http://localhost:8080/test/rate", body)
      .map(response => response.json() as Activity[])
      .subscribe((result : Activity[]) => {
          this.activities = result;
          this.map.remove();
          this.loadMap();
        },
        err => {

        }
      );
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap(){
    this.http.get("http://localhost:8080/test/activity/recommend/6457c33b-58a0-4dcf-9a01-b5955091532e")
      .map(response => response.json() as Activity[])
      .subscribe((result : Activity[]) => {
          this.activities = result;
          this.map = L.map('map').setView([49.443232, 1.099971], 13);

          L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(this.map);

          for(let i = 0; i < this.activities.length ; i++) {
            L.marker([this.activities[i].latitude, this.activities[i].longitude]).addTo(this.map)
              .bindPopup(this.activities[i].name);
          }
        },
        err => {

        }
      );
  }
}
