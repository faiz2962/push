import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

/**
 * Generated class for the ScanIdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-scan-id',
  templateUrl: 'scan-id.html',
})
export class ScanIdPage {

  qr_scan: any;
  user_level: any;
  basic_items: any;
  emer_items: any;
  qr_detail: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    public loading: LoadingController, ) {
    this.qr_scan = navParams.get('data');
    this.user_level = navParams.get('data2');
  }

  ngOnInit() {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });
    let data = {
      qr_scan: this.qr_scan,
      user_level: this.user_level
    };
    let loader = this.loading.create({

      content: 'Processing please wait…',

    });

    loader.present().then(() => {
      this.http.post('http://project.gelombangdigital.com/satir/web_system/mobile_app/qr_bio.php', data, options)
        .map(res => res.json())
        .subscribe(res => {

          this.basic_items = res.server_response;

          if (this.user_level == "usas") {
            this.qr_detail = "level_1";
            this.http.post('http://project.gelombangdigital.com/satir/web_system/mobile_app/qr_emer.php', data, options)
              .map(res => res.json())
              .subscribe(res => {

                this.emer_items = res.server_response;

              });
          } else {
            this.qr_detail = "level_0";
          }

          loader.dismiss()

        });
    });
  }

}
