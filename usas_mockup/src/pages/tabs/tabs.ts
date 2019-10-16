import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { UsasServicePage } from '../usas-service/usas-service';
import { SettingPage } from '../setting/setting';
import { SchedulePage } from '../schedule/schedule';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SchedulePage;
  tab3Root = AboutPage;
  tab4Root = UsasServicePage;
  tab5Root = SettingPage;

  constructor() {

  }
}
