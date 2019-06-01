import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AppProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppProvider {
  serveUrl:any;
  data:any;
  options:any;
  constructor(public http: HttpClient,public storage:Storage) {
    this.serveUrl="https://dev.chargerguru.com/beta00/calc/gmaps";
    
 
  }

  getData(data){
    this.data={ 
      "from": {
        "address": localStorage.getItem('startpt')
      }, 
      "to": {
        "address":localStorage.getItem('finalpt')
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
     return this.http.post(this.serveUrl,this.data,{headers:{'x-api-key':'VIOKBvXJB734l1qfl78uGauzX0epsrl65IxolBuC'}});
  }

}
