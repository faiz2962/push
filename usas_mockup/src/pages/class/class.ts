import { Component } from '@angular/core';
import { AlertController, NavController, ModalController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { ClassNotePage } from '../class-note/class-note';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-class',
  templateUrl: 'class.html',
})
export class ClassPage {

  student_idpass: any;
  student_id: any;
  items: any = [];
  noclass: string;
  key: string = 'items';
  public days: string;
  weekdays: any;
  scannedCode = null;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private http: Http,
    public loading: LoadingController,
    public modalCtrl: ModalController,
    private storage: Storage,
    private barcodeScanner: BarcodeScanner) {
    this.student_idpass = window.localStorage.getItem('student_id');
    this.noclass = "noclass";
    this.weekdays = ["isnin", "selasa", "rabu", "khamis", "jumaat", "sabtu", "ahad"];
  }

  getlist() {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    let data = {

      student_id: this.student_idpass,

    };

    let loader = this.loading.create({

      content: 'Processing please wait…',

    });

    loader.present().then(() => {
      this.http.post('http://project.gelombangdigital.com/satir/web_system/mobile_app/list_classub.php', data, options)
        .map(res => res.json())
        .subscribe(res => {

          loader.dismiss()
          this.items = res.server_response;
          this.storage.set(this.key, JSON.stringify(this.items));

        });
    });

    setTimeout(() => {
      loader.dismiss();
      this.storage.get(this.key).then((val) => {
        if (val != null && val != undefined) {
          this.items = JSON.parse(val)
        }
      });
    }, 5000)

  }

  ionViewWillEnter() {
    this.getlist();
  }

  all_note() {
    this.navCtrl.push(ClassNotePage);
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      let alert = this.alertCtrl.create({

        title: "QR Disahkan",
        subTitle: "Kod: " + this.scannedCode,
        buttons: ['OK']

      });

      alert.present();
    }, (err) => {
      console.log('Error: ', err);
    });
  }

}
