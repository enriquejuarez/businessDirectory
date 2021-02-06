import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps';
import { HighlightDirective } from './directives/highlight.directive';
import { CountClickDirective } from './directives/count-click.directive';
import { PlaceDetailComponent } from './components/place-detail/place-detail.component';
import { PlaceFormComponent } from './components/place-form/place-form.component';

@NgModule({
  declarations: [
    HomeComponent,
    HighlightDirective,
    CountClickDirective,
    PlaceDetailComponent,
    PlaceFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    GoogleMapsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
