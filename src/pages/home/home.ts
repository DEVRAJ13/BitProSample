import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StringProvider, ServiceProvider, NetworkProvider, AppbaseProvider } from '../../app/app.module';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private TOP_HEADLINES = AppbaseProvider.TOP_HEADLINES;
  private page = 0;
  private maximumPages = 50;
  private top_headlines:any = [];



  constructor(public navCtrl: NavController, public navParams: NavParams,private iab: InAppBrowser,private spinnerDialog: SpinnerDialog, private service: ServiceProvider) {
    this.loadUsers();
  }


  jumpToFeed(url) {
    let browser = this.iab.create(url, '_self', { location: 'no', zoom: 'no' });
    browser.on('loadstart').subscribe(event => {
      this.spinnerDialog.show();
    }, err => {
      console.log("InAppBrowser loadstart Event Error: " + err);
    });


    browser.on('loadstop').subscribe(event => {
      this.spinnerDialog.hide();
    }, err => {
      console.log("InAppBrowser loadstart Event Error: " + err);
    });


    browser.on('loaderror').subscribe(event => {
      this.spinnerDialog.hide();
      browser.close();
    }, err => {
      console.log("InAppBrowser loadstart Event Error: " + err);
    });
  }




  ionViewDidLoad() {
    //YOUR CODE
  }

  loadUsers(infiniteScroll?) {
    this.service.getClient(this.TOP_HEADLINES + 'country=in'+ `&pageSize=5&page=${this.page}`)
      .subscribe(res => {
        // this.users = this.users.concat(res['data']);
        this.top_headlines = this.top_headlines.concat(res['articles']);
        console.log("", this.top_headlines);
        if (infiniteScroll) {
          infiniteScroll.complete();
        }
      }, err => {
        var page_name = "HomePage";
        var message = "Server error"
        var status = false;
        this.service.errorMessage(page_name, message, status);
      });
  }

  loadMore(infiniteScroll) {
    this.page++;
    this.loadUsers(infiniteScroll);

    if (this.page === this.maximumPages) {
      infiniteScroll.enable(false);
    }
  }

  public searchEvery(){
    this.navCtrl.push('SearchPage');

  }

}
