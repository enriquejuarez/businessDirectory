import { Component, Input, OnInit } from '@angular/core';

import { Places } from './../../../../models/places.model';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  @Input() place: Places;

  constructor() { }

  ngOnInit(): void {
  }

}
