import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string,
  marker: Marker,
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public actualCenter: LngLat = new LngLat(-74.5, 40); // propiedad que usaremos para controlar el centro del mapa
  public userMarkers: MarkerAndColor[] = [] // array en el que almacenaremos los marcadores del usuario


  ngAfterViewInit(): void {

    // validaremos que siempre exista divMap
    if (!this.divMap) throw 'El elemento del mapa no ha sido encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.actualCenter, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });
  }

  // metodo que se llamara cuando se pulse el boton de añadir marcador
  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16)); // variable para generar colores aleatorios
    const lngLat = this.map?.getCenter()

    this.addMarker(lngLat, color)
  }

  // metodo que usaremos para añadir un marcador al elemento
  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker(
      {
        color,
        draggable: true,
      }
    ).setLngLat(lngLat).addTo(this.map)

    this.userMarkers.push({
      color,
      marker,
    });
  }

  // metodo que usaremos para eliminar el marcador deseado
  deleteMarker(index: number) {
    this.userMarkers[index].marker.remove();
    this.userMarkers.splice(index, 1)

  }

  // metodo que usaremos para volar hacia el marcador deseado
  goToMarker(marker: Marker) {
    if (!this.map) return;

    this.map.flyTo({
      zoom: 10,
      center: marker.getLngLat()
    });
  }
}
