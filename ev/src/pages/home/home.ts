import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import leaflet from 'leaflet';
import 'leaflet-routing-machine';


import {
  GeoSearchControl,
  OpenStreetMapProvider,
} from 'leaflet-geosearch';
import { HttpClient } from '@angular/common/http';

declare var $:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http:HttpClient, private cdr:ChangeDetectorRef) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    //setup leaflet map
    this.loadmap();
  }
  selected_station:any=0;
  stations = [];
  
  loadmap() {
    this.map = leaflet.map("map");
    console.log(this.map);
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

    const myCustomColour = '#583470'

    const markerHtmlStyles = `
      background-color: ${myCustomColour};
      width: 3rem;
      height: 3rem;
      display: block;
      left: -1.5rem;
      top: -1.5rem;
      position: relative;
      border-radius: 3rem 3rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`

      const icon = leaflet.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles}" />`
      })
    /*this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {})
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      console.log(e)
    }).on('locationerror', (err) => {
      alert(err.message);
    })*/
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e)=>{

    }).on('click', (e)=>{
      var long_var = document.getElementById("long_var")['value'], lat_var = document.getElementById("lat_var")['value'];
      this.http.get('http://localhost:8000/ev/near_points?lat='+e.latlng.lat+'&long='+e.latlng.lng+'&lat_var='+lat_var+'&long_var='+long_var).subscribe((data:any)=>{

     markerGroup = leaflet.featureGroup();  
      for(const x in data){
          
          data[x].data = JSON.parse(data[x].data);
          
          
          
          let marker:any = leaflet.marker([data[x].lat, data[x].long], {'icon':icon}).on('mouseover', (e)=>{
            var ele = document.getElementById("info");
            this.selected_station = data[x];
            ele.style.top=e.originalEvent.screenY+"px";
            ele.style.left=e.originalEvent.screenX+"px";
            this.refresh();
            
          }).on('mouseout', (e)=>{
            var ele = document.getElementById("info");
            ele.style.top="-500px";
          })
          markerGroup.addLayer(marker);
          this.map.addLayer(markerGroup);
        }
      });
      console.log([e.latlng.lat, e.latlng.lng]);

      let markerGroup = leaflet.featureGroup();
      let marker:any = leaflet.marker([e.latlng.lat, e.latlng.lng]).on('click', (e)=>{console.log(e);})
        markerGroup.addLayer(marker);
        this.map.addLayer(markerGroup);



      })
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
    });
    this.map.addControl(searchControl);

 
  }

  refresh(){
    this.cdr.detectChanges();
  }
}
