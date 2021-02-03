import { Component, OnInit } from '@angular/core';

import { PlacesService } from './../../../core/services/places.service';
import { Places } from './../../../../models/places.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  places: Places[];
  center: google.maps.LatLngLiteral = {lat: 19.5379302, lng: -96.9092582};
  zoom = 14;
  display;

  constructor(
    private placesService: PlacesService
  ) { }

  ngOnInit(): void {
    this.places = this.placesService.getAllPlaces();
  }

  moveMap(event: google.maps.MapMouseEvent): void {
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent): void {
    this.display = event.latLng.toJSON();
  }

}
