import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs';

// Firebase's project configuration..
var firebaseConfig = {
  apiKey: "AIzaSyAaOXMU4ZNzqkkElCCwPqw8kQmGOKEPIqE",
  authDomain: "iseayou-27287.firebaseapp.com",
  databaseURL: "https://iseayou-27287.firebaseio.com",
  projectId: "iseayou-27287",
  storageBucket: "iseayou-27287.appspot.com",
  messagingSenderId: "587302071405",
  appId: "1:587302071405:web:dc9873533bd0822d2fe364",
  measurementId: "G-MCEKMDYW4R"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  private subscription: Subscription;
  private lat: number;
  private long: number;

  constructor(private camera: Camera, private geolocation: Geolocation) {
    // get db instance
    let db = firebase.firestore();

    db.collection('contributions').doc('root')
    .get().then(
    doc => {
      if (doc.exists) {
        console.log('it exists do nothing..');
      } else {
        db.collection('contributions').doc('root').set({
          rule: "seed"
          }).then(res => {
          console.log(res);
        })
      }
    });

    
    
    // db.collection('contributions').add({
    //   rule: "seed"
    // }).then(res => {
    //   console.log(res);
    // })
  }

  ngOnInit() {}

  openCamera() {
    // get long & lat for later
    this.getLocation();
    
    // create camera instance
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    
    // start camera up with instance
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    let db = firebase.firestore();
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    db.collection('contributions').add({
      image: base64Image,
      location: 'Limassol, CY',
      latitude: this.lat,
      longitude: this.long,
      date: utc,
      time: time
    }).then(ref => {
      alert('Your contribution has been received with ID: '+ref.id);
    })


      // let addDoc = db.collection('sea').add({
      //  image: base64Image,
      //  location: 'Limassol, CY',
      //  latitude: this.lat,
      //  longitude: this.long,
      //  date: new Date(),
      //  time: new Date().getTime()
      // }).then(ref => {
      //  alert('Your contribution document with ID: '+ ref.id + ' has been received!');
      // });
      

    console.log('Your image uri is located at:' + + base64Image);
    }, (err) => {
     // Handle error
    });
  }

  // Configure & start firebase with db
  startFirebase(){
    
  }

  // Get position of user, long & lat
  getLocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    });
     
    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //   //data can be a set of coordinates, or an error (if an error occurred).
    //   //data.coords.latitude
    //   //data.coords.longitude
    //  });

  }


}
