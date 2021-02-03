import { Injectable } from '@angular/core';

import { Places } from './../../../models/places.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  places: Places[] = [
    {
      id: 1,
      plan: 'free',
      distance: 15,
      closeness: 5,
      active: true,
      name: 'Tortas Forman'
    },
    {
      id: 2,
      plan: 'premium',
      distance: 10,
      closeness: 5,
      active: false,
      name: 'Miscelanea Char'
    },
    {
      id: 3,
      plan: 'premium',
      distance: 25,
      closeness: 8,
      active: true,
      name: 'Tacos pepe'
    },
    {
      id: 4,
      plan: 'free',
      distance: 11,
      closeness: 2,
      active: false,
      name: 'Online Support'
    }
  ];

  constructor() { }

  getAllPlaces(): Places[]{
    return this.places;
  }
}
