import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about-qr',
  templateUrl: 'about-qr.html',
})
export class AboutQrPage {
  
  mark:string = 'qr_data';
  student_idpass: any;
  qr_items:any = [];
  qr_convert:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private storage: Storage) {
    this.student_idpass = window.localStorage.getItem('student_id');
  }

  ngOnInit(){
    this.storage.get(this.mark).then((val) => {
      if(val!=null && val != undefined){
        this.qr_items = JSON.stringify(val)
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
