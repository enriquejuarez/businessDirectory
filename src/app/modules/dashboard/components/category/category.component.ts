import { Component, Input, OnInit } from '@angular/core';

import { Categories } from '../../../../models/categories.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category: Categories;

  constructor() { }

  ngOnInit(): void {
  }

}
