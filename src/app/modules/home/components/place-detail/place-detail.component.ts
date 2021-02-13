import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PlacesService } from './../../../core/services/places.service';
import { Places } from './../../../../models/places.model';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {

  id: string;
  place: Places;
  center: google.maps.LatLngLiteral = {lat: 19.5379302, lng: -96.9092582};
  zoom = 14;

  constructor(
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.place = this.placesService.getPlace(Number(this.id))
      .subscribe( (place) => {
        console.log(place);
        this.place = place[0];
      },
      err => { console.log(err); });
    });
  }

}
