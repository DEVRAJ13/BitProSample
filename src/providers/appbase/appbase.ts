import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppbaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppbaseProvider {
  static BASE_URl= 'https://newsapi.org/v2/'   //Base url


  static TOP_HEADLINES = AppbaseProvider.BASE_URl + 'top-headlines?apiKey=82c97f1124e8432dbf07e5465de21938&';
  static EVERYTHING = AppbaseProvider.BASE_URl + 'everything?apiKey=82c97f1124e8432dbf07e5465de21938&';
}
