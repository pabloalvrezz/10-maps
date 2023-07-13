import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.css']
})
export class ZoomPageComponent implements AfterViewInit {

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {

    // validaremos que siempre exista divMap
    if (!this.divMap) throw 'El elemento del mapa no ha sido encontrado';

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

  }

}
