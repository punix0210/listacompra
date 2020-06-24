import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DatabaseService } from './shared/service/database.service';
import { CoreService } from './shared/core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dbService: DatabaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.statusBar.styleDefault();
      await this.dbService.createDataBase().then((res) => {
        if (res.error) {
          console.log(res.error);
          alert(`${res.error}`);
        }
      });
      await this.splashScreen.hide();
    });
  }
}
