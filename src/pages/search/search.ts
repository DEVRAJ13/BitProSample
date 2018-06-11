import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StringProvider, ServiceProvider, NetworkProvider, AppbaseProvider } from '../../app/app.module';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Observable } from 'rxjs/Observable';
import { ChangeDetectorRef } from '@angular/core';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  private EVERYTHING = AppbaseProvider.EVERYTHING;
  private searchQuery: string = '';
  private items: string[];
  private tabBarElement: any;
  private page = 0;
  private maximumPages = 50;
  matches: any;
  isRecording = false;

  constructor(public navCtrl: NavController,private speechRecognition: SpeechRecognition,private cd: ChangeDetectorRef, public navParams: NavParams, private service: ServiceProvider) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }


  startListening() {
    this.getPermission();
    let options = {
      language: 'en-US'
    }
    this.speechRecognition.startListening().subscribe(matches => {
      this.matches = matches[0];
      console.log(this.matches);
      this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  stopListening() {
    this.speechRecognition.stopListening().then(() => {
      this.isRecording = false;
    });
  }
 
  getPermission() {
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if (!hasPermission) {
          this.speechRecognition.requestPermission();
        }
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
 
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  getItems(ev: any) {
    const val = ev.target.value;
    this.service.getCall(this.EVERYTHING +'q='+ val).map(res => res.json())
    .subscribe(res => { 
      this.items = res.articles;
      console.log(res)
    }, err => {

    });
  }
}