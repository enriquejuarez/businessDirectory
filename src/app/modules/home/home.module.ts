import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './../material/material.module';

import { GoogleMapsModule } from '@angular/google-maps';
import { HighlightDirective } from './directives/highlight.directive';
import { CountClickDirective } from './directives/count-click.directive';

@NgModule({
  declarations: [
    HomeComponent,
    HighlightDirective,
    CountClickDirective
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    GoogleMapsModule
  ]
})
export class HomeModule { }
