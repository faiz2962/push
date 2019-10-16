import { AboutQrPage } from './../about-qr/about-qr';
import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage {
  student_idpass: any;
  noti_level_pass: any;
  items: any = [];
  emers: any = [];
  mark: string = 'qr_data';

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private http: Http,
    private storage: Storage,
    public loading: LoadingController) {
    this.student_idpass = window.localStorage.getItem('student_id');
    this.noti_level_pass = window.localStorage.getItem('noti_level');
  }
  openAddSubModal() {
    let popover = this.modalCtrl.create(AboutQrPage, null, { cssClass: 'inset-modal-add' });
    popover.present();
  }

  ngOnInit() {

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
      // GET DETAIL
      this.http.post('http://project.gelombangdigital.com/satir/web_system/mobile_app/stud_bio.php', data, options)
        .map(res => res.json())
        .subscribe(res => {

          this.items = res.server_response;
          this.storage.set(this.mark, JSON.stringify(this.items));

          // GET EMERGENCY CONTACT
          this.http.post('http://project.gelombangdigital.com/satir/web_system/mobile_app/stud_emer.php', data, options)
            .map(res2 => res2.json())
            .subscribe(res2 => {

              loader.dismiss()
              this.emers = res2.server_response;

            });
        });
    });
  }

}
