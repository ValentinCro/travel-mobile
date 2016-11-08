import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map'
import {Activity} from "../../providers/Activity";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  activities : any;
  constructor(public navCtrl: NavController, public http: Http) {}

}
