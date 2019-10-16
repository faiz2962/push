import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UsasServicePage } from '../pages/usas-service/usas-service';
import { SettingPage } from './../pages/setting/setting';
import { LoginPage } from './../pages/login/login';
import { ClassPage } from './../pages/class/class';
import { SafePipe } from './../pages/home/home';
import { EventPage } from './../pages/event/event';
import { SchedulePage } from './../pages/schedule/schedule';
import { ScanIdMultidataPage } from './../pages/scan-id-multidata/scan-id-multidata';
import { ScanIdPage } from './../pages/scan-id/scan-id';
import { ClassNoteDetailPage } from './../pages/class-note-detail/class-note-detail';
import { ClassNotePage } from './../pages/class-note/class-note';
import { AboutQrPage } from './../pages/about-qr/about-qr';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRCodeModule } from 'angularx-qrcode';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    UsasServicePage,
    SettingPage,
    ClassPage,
    LoginPage,
    AboutQrPage,
    SafePipe,
    ClassNotePage,
    ClassNoteDetailPage,
    ScanIdPage,
    ScanIdMultidataPage,
    SchedulePage,
    EventPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    QRCodeModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    UsasServicePage,
    SettingPage,
    ClassPage,
    LoginPage,
    AboutQrPage,
    ClassNotePage,
    ClassNoteDetailPage,
    ScanIdPage,
    ScanIdMultidataPage,
    SchedulePage,
    EventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SafePipe,
    BarcodeScanner,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
