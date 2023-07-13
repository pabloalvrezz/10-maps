import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MapsRoutingModule } from './maps-routing.module';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ZoomPageComponent } from './pages/zoom-page/zoom-page.component';
import * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoicGFibG9hbHZyZXp6IiwiYSI6ImNsanpxM21wczBnemkzY3J1aXRib2RyYXQifQ.P_V3MbKylCQjYbIBjxFwDw';

@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomPageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
