import { Component } from '@angular/core';
import * as firebase from 'firebase';

// Firebase's project configuration..


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  pulledContributions = new Array;

  constructor() {}

  ionViewWillEnter(){
   this.pullContributions();
  }

  ionViewWillLeave(){
   this.pulledContributions = [];
  }

  pullContributions() {
    let db = firebase.firestore();
    db.collection('contributions').get()
    .then((snapshot) => {
    snapshot.forEach((doc) => {
      
      if(doc.data().rule !== 'seed'){
      const data = {
        image: doc.data().image, 
        date: doc.data().date,
        latitude: doc.data().latitude,
        location : doc.data().location,
        longitude: doc.data().longitude,
        time: doc.data().time

      }
        this.pulledContributions.push(data);
      }
    
      
      
      
      console.log(doc.id, '=>', doc.data());
    });
    })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
  }

}
