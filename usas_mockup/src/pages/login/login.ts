import { TabsPage } from './../tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild("student_id") student_id;
  @ViewChild("password") password;
  pens: any = [];
  key: string = 'pens';

  public backgroundImage = 'assets/imgs/login.png';

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    private http: Http,
    public loading: LoadingController,
    private storage: Storage) {
  }

  signIn() {
    if (this.student_id.value == "") {

      let alert = this.alertCtrl.create({

        title: "Perhatian",
        subTitle: "No. Matrik Tidak Diisi",
        buttons: ['OK']

      });

      alert.present();

    } else if (this.password.value == "") {

      let alert = this.alertCtrl.create({

        title: "Perhatian",
        subTitle: "Kata Laluan Tidak Diisi",
        buttons: ['OK']

      });

      alert.present();

    } else {

      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      let data = {

        student_id: this.student_id.value,
        password: this.password.value

      };

      let loader = this.loading.create({

        content: 'Sedang Diproses…',

      });

      loader.present().then(() => {

        this.http.post('http://project.gelombangdigital.com/satir/web_system/mobile_app/login.php', data, options)
          .map(res => res.json())

          .subscribe(res => {

            console.log(res)
            loader.dismiss()

            if (res == "1") {

              let alert = this.alertCtrl.create({

                title: "Tahniah",
                subTitle: "Selamat Kembali!",
                buttons: ['OK']

              });

              alert.present();

              window.localStorage.setItem('student_id', this.student_id.value);
              this.pushNotiGroup();
              this.navCtrl.setRoot(TabsPage);
              this.storage.set('isLoggedIn', true);

            } else {

              let alert = this.alertCtrl.create({

                title: "RALAT",
                subTitle: "Sila Periksa Semula No. Matrik & Kata Laluan Anda.",
                buttons: ['OK']

              });

              alert.present();

            }

          });

      });

    }

  }

  pushNotiGroup() {
    var first_letter = this.student_id.value.charAt(0);
    if (this.student_id.value.length == 10 || this.student_id.value.length == 9) {
      if (first_letter == "s" || first_letter == "S") {
        window.localStorage.setItem('noti_level', "group_3");
      } else {
        window.localStorage.setItem('noti_level', "group_2");
      }
    } else {
      window.localStorage.setItem('noti_level', "group_1");
    }
  }

}
