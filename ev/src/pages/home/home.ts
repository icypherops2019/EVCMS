import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import leaflet from 'leaflet';
import 'leaflet-routing-machine'; 


import {
  GeoSearchControl,
  OpenStreetMapProvider,
} from 'leaflet-geosearch';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    //setup leaflet map
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map("map");
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

 
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {    
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      console.log(e)
      }).on('locationerror', (err) => {
        alert(err.message);
    })
    const provider = new OpenStreetMapProvider();
    
   const searchControl = new GeoSearchControl({
  provider: provider,
   });
   this.map.addControl(searchControl);


   leaflet.Routing.control({
    waypoints: [
        leaflet.latLng(28.7041, 77.1025),
        leaflet.latLng(19.0760, 72.8777)
    ], routeWhileDragging: true 
}).addTo(this.map);

   
  }
}
