import { ClassPage } from './../class/class';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventPage } from '../event/event';


@Component({
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  classTabRoot = ClassPage;
  activityTabRoot = EventPage;

  constructor(public navCtrl: NavController) {}

}
