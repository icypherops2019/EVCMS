import { Component } from '@angular/core';
import { NavController, NavParams,Nav  } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';
import { Http, Headers } from '@angular/http';

import { QrPage } from '../qr/qr';
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  cardinfo: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public stripe: Stripe, public http: Http,public nav:Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }

  pay() {
    this.stripe.setPublishableKey("pk_test_N8Ew0gMnDu3OTYzNMVoUPdIO");
    this.stripe.createCardToken(this.cardinfo).then((token) => {
      var data = 'stripetoken=' + token + '&amount=50';
      var headers = new Headers();
      headers.append('Conent-Type', 'application/x-www-form-urlencoded');
      this.http.post('http://localhost:8100/processpay', data, { headers: headers }).subscribe((res) => {
        if (res.json().success)
        alert('transaction Successfull!!')  
      })
    })
  }

  payDone(){
  this.nav.setRoot(QrPage)
  }

  
}
