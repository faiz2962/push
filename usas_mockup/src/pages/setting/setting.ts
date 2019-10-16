import { ScanIdMultidataPage } from './../scan-id-multidata/scan-id-multidata';
import { ScanIdPage } from './../scan-id/scan-id';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  scannedCode = null;
  @ViewChild("scan_user") scan_user;
  @ViewChild("scan_user_multidata") scan_user_multidata;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              private storage: Storage,
              private barcodeScanner: BarcodeScanner) {
  }

  logout(){
    localStorage.clear(); 
    this.storage.set('isLoggedIn', false);
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }

  QRpass(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.navCtrl.push(ScanIdPage, {
        data: this.scannedCode, 
        data2: this.scan_user
      });
    }, (err) => {
        console.log('Error: ', err);
    });
  }

  QRpassmulti(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.navCtrl.push(ScanIdMultidataPage, {
        data: this.scannedCode, 
        data2: this.scan_user
      });
    }, (err) => {
        console.log('Error: ', err);
    });
  }
}
