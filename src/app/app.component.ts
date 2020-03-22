import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    

    //var functions = require('firebase-functionsioni');
    //admin.initializeApp(functions.config().firebase);

    // let db = admin.firestore();

    // let docRef = db.collection('users').doc('alovelace');

    // let setAda = docRef.set({
    //   first: 'ada',
    //   last: 'alovelace',
    //   born: 1815
    // });


    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
