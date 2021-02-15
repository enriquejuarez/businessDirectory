import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndexComponent } from './components/index/index.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from './../material/material.module';
import { CategoriesComponent, CategorydataComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
  declarations: [IndexComponent, LayoutComponent, CategoriesComponent, CategoryComponent, CategorydataComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class DashboardModule { }
