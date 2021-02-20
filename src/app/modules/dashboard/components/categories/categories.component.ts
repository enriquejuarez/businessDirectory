import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Categories } from '../../../../models/categories.model';
import { CategoryService } from './../../../core/services/category.service';

import { ToastrService } from 'ngx-toastr';

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
  searchFilter = '';
  categoriesBackup: Categories[];

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories()
    .subscribe( (categories) => {
      this.categories = categories;
      this.categoriesBackup = categories;
    },
      err => { console.log('Se ha generado un error: ', err);
    });
  }

  openDialog(operation: string, operationText: string, categoryData: Categories): void {
    const dialogRef = this.dialog.open(CategorydataComponent, {
      width: '900px',
      data: {
        category: categoryData,
        title: operationText,
        action: operation
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (operation === 'new') {
          this.saveCategory(result.category, 'new');
          this.toastr.success('Operación exitosa!', 'Categoría creada');
        }else{
          this.saveCategory(result.category, 'edit');
          this.toastr.success('Operación exitosa!', 'Categoría actualizada');
        }
      }
    },
    err => {
      this.toastr.error('Operación falló', 'Contacte a soporte');
    });
  }

  editCategory(category: Categories): void{
    this.openDialog('Editar', 'Editar categoría', category);
  }

  saveCategory(category: Categories, action: string): void{
    if (action === 'new') {
      category.id = Date.now();
    }
    this.categoryService.saveCategory(category);
  }

  filterCategory(): void{
    if (!this.searchFilter) {
      this.categories = this.categoriesBackup;
      return;
    }
    this.categories = this.categories.filter((category) => {
      return category.name.toLowerCase().includes(this.searchFilter.toLowerCase());
    });
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
