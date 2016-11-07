import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import {Activity} from "../../providers/Activity";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  activities: any;

  constructor(public navCtrl: NavController, public http: Http) {
    this.http.get("http://localhost:8080/test/rate/all")
      .map(response => response.json() as Activity[])
      .subscribe((result : Activity[]) => {
          this.activities = result;
        },
        err => {

        }
      );
  }

}


