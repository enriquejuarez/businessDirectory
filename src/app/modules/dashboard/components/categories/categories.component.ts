import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Categories } from '../../../../models/categories.model';
import { CategoryService } from './../../../core/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Categories[];
  category: Categories = {
    id: 0,
    name: '',
    description: '',
    icon: ''
  };
  title = 'Nueva categoría';
  action = 'Guardar';

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories()
    .subscribe( (categories) => {
      console.log(categories);
      this.categories = categories;
    },
      err => { console.log('Se ha generado un error: ', err);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategorydataComponent, {
      width: '900px',
      data: {
        category: this.category,
        title: this.title,
        action: this.action
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result !== undefined) {
        this.saveCategory(result.category, 'new');
      }
    });
  }

  saveCategory(category: Categories, action: string): void{
    if (action === 'new') {
      category.id = Date.now();
    }
    this.categoryService.saveCategory(category);
  }

}

@Component({
  selector: 'app-categorydata',
  templateUrl: 'categoryData.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategorydataComponent {

  constructor(
    public dialogRef: MatDialogRef<CategorydataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
