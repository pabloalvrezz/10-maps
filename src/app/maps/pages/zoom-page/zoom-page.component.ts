import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-page.component.html',
  styleUrls: ['./zoom-page.component.css']
})
export class ZoomPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  public divMap?: ElementRef;

  public actualZoom: number = 10; // propiedad que usaremos para controlar el zoom del mapa
  public map?: Map;
  public actualCenter: LngLat = new LngLat(-74.5, 40); // propiedad que usaremos para controlar el centro del mapa

  ngAfterViewInit(): void {

    // validaremos que siempre exista divMap
    if (!this.divMap) throw 'El elemento del mapa no ha sido encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.actualCenter, // starting position [lng, lat]
      zoom: this.actualZoom, // starting zoom
    });

    this.mapListeners()
  }

  ngOnDestroy(): void {
    this.map?.remove
  }

  // evento que usaremos para escuchar los eventos del mapa
  mapListeners() {
    // debemos comprobar que siempre exista el mapa
    if (!this.map) throw 'El mapa no ha sido actualizado'

    // controlamos el zoom que tiene el mapa
    this.map.on('zoom', () => {
      this.actualZoom = this.map!.getZoom();
    });

    // controlamos el zoom que estamos haciendo y no dejamos que sobrepase el nivel maximo
    this.map.on('zoomend', () => {
      if (this.map!.getZoom() < 18) return;

      this.map!.zoomTo(18)
    });

    // controlamos las coordenadas del mapa
    this.map.on('move', () => {
      this.actualCenter = this.map!.getCenter();
    })

  }

  // metodo que usaremos para controlar el valor que ha cambiado del zoom
  zoomChanged(value: string) {
    this.actualZoom = Number(value);
    this.map?.zoomTo(this.actualZoom);
  }

  // metodo que usaremos para controlar el zoom in
  zoomIn() {
    this.map?.zoomIn();
  }

  // metodo que usaremos para controlar el zoom out
  zoomOut() {
    this.map?.zoomOut();
  }
}
