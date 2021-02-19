import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

import { PlacesService } from './../../../core/services/places.service';
import { Places } from './../../../../models/places.model';
import { AuthService } from './../../../core/services/auth.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('animationContent', [
      state('initial', style({
        opacity: 0,
        backgroundColor: 'green',
        transform: 'rotate3d(0,0,0,0deg)'
      })),
      state('final', style({
        opacity: 1,
        backgroundColor: 'yellow',
        transform: 'rotate3d(5,10,20,30deg)'
      })),
      transition('initial => final', animate(1000)),
      transition('final => initial', animate(500))
    ])
  ]
})
export class HomeComponent implements OnInit {

  allPlaces: Places[];
  featuredPlaces: Places[];
  center: google.maps.LatLngLiteral = {lat: 19.5379302, lng: -96.9092582};
  zoom = 14;
  display;
  state = 'final';
  loggendin: boolean;
  subscription: Subscription;

  constructor(
    private placesService: PlacesService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.subscription = this.authService.isLogged()
      .subscribe((result) => {
        if (result && result.uid){
          this.loggendin = true;
        }else{
          this.loggendin = false;
        }
      },
      (error) => {
        this.loggendin = false;
        console.log('Error logout: ', error);
      });
   }

  ngOnInit(): void {
    this.allPlaces = this.placesService.getAllPlaces()
    .subscribe( (places) => {
      this.allPlaces = places;
      this.featuredPlaces = places.filter((place) => place.plan === 'premium');
    },
    err => { console.log('Se ha generado un error: ', err); });
  }

  animate(): void{
    this.state = (this.state === 'final') ? 'initial' : 'final';
  }

  animationStarts(e): void{
    console.log('Animación incia', e);
  }

  animationFinal(e): void{
    console.log('Animación termina', e);
  }

  moveMap(event: google.maps.MapMouseEvent): void {
    this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent): void {
    this.display = event.latLng.toJSON();
  }

}
