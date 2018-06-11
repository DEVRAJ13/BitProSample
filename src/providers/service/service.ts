import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Platform, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { StringProvider, NetworkProvider, AppbaseProvider } from '../../app/app.module';
import { Toast } from '@ionic-native/toast';
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/operator/map";

import { HttpClientModule } from '@angular/common/http';

declare var navigator: any;
declare var Connection: any;
declare var cordova: any;


@Injectable()
export class ServiceProvider {

  constructor(private http: Http,public modalCtrl: ModalController,private httpClint: HttpClient, private toast: Toast, private platform: Platform, public loaderCtrl: LoadingController, private toastCtrl: ToastController) {

  }

  postCall(url: string, body: any) {
    return this.http.post(url, body);
  }

  postImage(url: string,file:any, body: any) {
    return this.http.post(url, body);
  }

  getCall(url: string) {
    return this.http.get(url);
  }

  getPostDetail(url: string ) {
    return this.http.get(url);
  }

  getClient(url:string){
   return this.httpClint.get(url);
  }

  checkNetworkConnection(): boolean {
    if (!this.platform.is('cordova')) {
      return true;
    }
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
      return false;
    }
    return true;
  }

  showMessage(msg: string) {
    if (this.platform.is('cordova')) {
      this.toast.show(msg, '5000', 'bottom').subscribe(
        toast => {
          console.log(toast);
        });
    }
  }


 errorMessage(page_ref: string, msg: string, status: boolean){
  let verifyModal = this.modalCtrl.create("ErrorPage", { 
    message: msg,
    status: status,
    page_name: page_ref
  });
  verifyModal.present();
 }

}