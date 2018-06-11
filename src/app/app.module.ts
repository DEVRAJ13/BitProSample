import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Toast } from '@ionic-native/toast';

import { StringProvider } from '../providers/string/string';
import { ServiceProvider } from '../providers/service/service';
import { NetworkProvider } from '../providers/network/network';
import { AppbaseProvider } from '../providers/appbase/appbase';

import { SuperTabsModule } from 'ionic2-super-tabs';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

export {
  StringProvider,
  ServiceProvider,
  NetworkProvider,
  AppbaseProvider
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    SuperTabsModule
        
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StringProvider,
    ServiceProvider,
    NetworkProvider,
    AppbaseProvider,
    SpeechRecognition,
    SpinnerDialog,
    InAppBrowser,
    Toast
  ]
})
export class AppModule {}
