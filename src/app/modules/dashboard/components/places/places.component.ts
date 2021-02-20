import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Places } from './../../../../models/places.model';
import { PlacesService } from './../../../core/services/places.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  searchFilter: string;
  places: Places[];
  placesBackup: Places[];

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.places = this.placesService.getAllPlaces()
    .subscribe( (places) => {
      this.places = places;
      this.placesBackup = places;
    },
    err => { console.log('Se ha generado un error: ', err); });
  }

  filterPlaces(): void{
    if (!this.searchFilter) {
      this.places = this.placesBackup;
      return;
    }
    this.places = this.places.filter((category) => {
      return category.name.toLowerCase().includes(this.searchFilter.toLowerCase());
    });
  }

  editPlace(place: Places): void{
    this.router.navigate(['/administration/places/create', place.id]);
  }

  deletePlace(place: Places): void{
    this.placesService.deletePlace(place)
    .then(() => {
      this.toastr.success('Operación exitosa!', 'Comercio eliminado');
    }).catch(() => {
      this.toastr.error('Contacte a soporte', 'No es posible eliminar en este momento');
    });
  }
}
