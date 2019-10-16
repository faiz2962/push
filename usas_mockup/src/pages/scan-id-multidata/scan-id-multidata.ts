import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-scan-id-multidata',
  templateUrl: 'scan-id-multidata.html',
})
export class ScanIdMultidataPage {

  qr_scan:any;
  user_level:any;
  basic_items:any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.qr_scan = navParams.get('data');
    this.user_level = navParams.get('data2');
  }

  ngOnInit(){  

    this.basic_items = JSON.parse(this.qr_scan);
    
  }

}
