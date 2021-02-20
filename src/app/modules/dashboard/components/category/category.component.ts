import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Categories } from '../../../../models/categories.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category: Categories;
  @Output() categoryClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  editCategory(category: Categories): void{
    this.categoryClicked.emit(category);
  }
}
