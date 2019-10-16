import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';
import { Component, ViewChild } from '@angular/core';
import { AlertController, Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) navCtrl: Nav;
  public rootPage;
  noti_level_pass: any;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    private storage: Storage,
    private push: Push) {

    this.initializeApp();
    this.noti_level_pass = window.localStorage.getItem('noti_level');

  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storage.get('isLoggedIn').then((isLoggedIn) => {
        this.rootPage = isLoggedIn ? TabsPage : LoginPage;
      });

      this.pushSetup();
      var offline = Observable.fromEvent(window, "offline");
      var online = Observable.fromEvent(window, "online");

      offline.subscribe(() => {
        let alert = this.alertCtrl.create({
          title: "Perhatian",
          subTitle: "Peranti Anda di Luar Talian",
          buttons: ['OK']
        });
        alert.present();
      });

      online.subscribe(() => {
        console.log('Online event was detected.');
      })

    });
  }

  openPage(page) {
    this.navCtrl.setRoot(page.component);
  }
  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '1080534237450',
        icon: 'usas_mobile',
        iconColor: "blue",
        forceShow: true,
        topics: ["group_1", "public"]
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let youralert = this.alertCtrl.create({
          title: 'USAS Mobile Campus',
          message: notification.message,
        });
        youralert.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}
