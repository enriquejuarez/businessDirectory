import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Places } from './../../../../models/places.model';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  @Input() place: Places;
  @Output() placeClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editPlace(place: Places): void{
    this.placeClicked.emit(place);
  }

}
