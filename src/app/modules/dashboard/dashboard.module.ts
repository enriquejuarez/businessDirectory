import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IndexComponent } from './components/index/index.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MaterialModule } from './../material/material.module';
import { CategoriesComponent, CategorydataComponent } from './components/categories/categories.component';
import { CategoryComponent } from './components/category/category.component';
import { PlacesComponent } from './components/places/places.component';
import { PlaceComponent } from './components/place/place.component';
import { PlaceFormComponent } from './components/place-form/place-form.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [IndexComponent, LayoutComponent, CategoriesComponent, CategoryComponent, CategorydataComponent, PlacesComponent, PlaceComponent, PlaceFormComponent, ProfileComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
