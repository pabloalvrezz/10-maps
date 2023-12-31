import { Component, Input, ViewChild, ElementRef } from '@angular/core';

import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})

export class MiniMapComponent {

  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;


  ngAfterViewInit() {
    if (!this.divMap) throw 'El mapa no existe'
    if (!this.lngLat) throw 'El elemento lngLat tiene que existit'

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 14, // starting zoom
      interactive: false,
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map)
  }

}
