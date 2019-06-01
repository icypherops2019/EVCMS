import { Component } from '@angular/core';
import { NavController,Nav} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppProvider } from '../../providers/app/app';

import { ContactPage } from '../contact/contact';



@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
startpt:any;
finalpt:any;
result:any;
error:any;
data:any;
  constructor(public navCtrl: NavController,public storage : Storage,public as:AppProvider,public nav : Nav) {
  }


  submit(){
    localStorage.setItem('finalpt',this.finalpt);
    localStorage.setItem('startpt',this.startpt);
    this.data= { 
      "from": {
        "address": "delhi , india"
      }, 
      "to": {
        "address": "punjab, india"
      },
      "waypoints": [],
      "vehicleType": "2AxlesAuto",
        "fuelPrice": "3.00",
        "fuelPriceCurrency": "INR",
        "fuelEfficiency": {
            "city": 24,
            "hwy": 30,
            "units": "mpg"
        }
     }

    this.as.getData(this.data).subscribe(res=>{
      this.result=res;
      localStorage.setItem('chargers',JSON.stringify(this.result['routes'][0]['chargers']));
      console.log(this.result['routes'][0]['chargers']);
      console.log(this.result);
      this.nav.setRoot( ContactPage); 
  },err=>{
      this.error="Someting Went Wrong";
  });
  }
  

}
