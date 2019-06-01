import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Stripe } from '@ionic-native/stripe';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CardPage } from '../pages/card/card';
import { QrPage } from '../pages/qr/qr';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppProvider } from '../providers/app/app';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CardPage,
    QrPage 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    CardPage,
    TabsPage,
    QrPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Stripe,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppProvider
  ]
})
export class AppModule {}
