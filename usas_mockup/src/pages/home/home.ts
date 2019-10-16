import { Component } from '@angular/core';
import { AlertController, ToastController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from "@angular/http";
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  null_profile: string = "assets/imgs/icon_null.png";
  items: any;
  filterItems: any;
  show: string = "show";
  text: string = "text";
  image: string = "image";
  video: string = "video";
  videolink: any;
  student_idpass: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private http: Http,
    public loading: LoadingController,
    public toastController: ToastController) {
    this.doRefresh(0);
    this.student_idpass = window.localStorage.getItem('student_id');
  }

  ngOnInit() {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({ headers: headers });
    let loader = this.loading.create({

      content: 'Getting new post please wait…',

    });

    loader.present().then(() => {
      this.http.post('http://project.gelombangdigital.com/satir/web_system/mobile_app/get_news.php', options)
        .map(res => res.json())
        .subscribe(res => {

          loader.dismiss()
          this.items = res.server_response;
          this.filterItems = this.items;

        });
    });
  }

  doRefresh(refresher) {
    this.ngOnInit();
    setTimeout(() => {
      if (refresher != 0)
        refresher.complete();
    }, 2000);
  };

  add_missList(berita_id: any, berita_tajuk: any) {

    const toast = this.toastController.create({
      message: 'Respon anda telah disimpan.',
      duration: 2000,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Tutup'
    });
    toast.present();
  }

  confirm_goList(berita_id: any, berita_tajuk: any) {

    let alert = this.alertCtrl.create({

      title: "KEPASTIAN",
      subTitle: "Adakah anda bersetuju untuk hadir " + berita_tajuk,
      buttons: [
        {
          text: 'NO',
          handler: () => {
            alert.dismiss();
            return false;
          }
        },
        {
          text: 'YES',
          handler: () => {
            alert.dismiss();
            this.add_goList(berita_id, berita_tajuk);
            return false;
          }
        }
      ]
    });

    alert.present();

  }

  add_goList(berita_id: any, berita_tajuk: any) {
    // var headers = new Headers(); 
    // headers.append("Accept", 'application/json');
    // headers.append('Content-Type', 'application/json');

    // let options = new RequestOptions({ headers: headers });
    // let data2 = {
    //   news_id : berita_id,
    //   student_id : this.student_idpass
    // };

    // this.http.post('http://faiz296.yayasanypem.com/satir/web_system/mobile_app/add_attendList.php',data2,options)
    // .map(res => res.json())
    // .subscribe(res => {

    //   this.items=res.server_response;
    //   this.filterItems=this.items;

    // });

    const toast = this.toastController.create({
      message: berita_tajuk + ' telah ditambah dalam senarai anda bakal hadir.',
      duration: 2000,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Tutup'
    });
    toast.present();
  }

}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
