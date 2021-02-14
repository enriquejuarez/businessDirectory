import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndexComponent } from './components/index/index.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from './../material/material.module';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
  declarations: [IndexComponent, LayoutComponent, CategoriesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
