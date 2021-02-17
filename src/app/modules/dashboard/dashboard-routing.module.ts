import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PlacesComponent } from './components/places/places.component';
import { PlaceFormComponent } from './components/place-form/place-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'places',
        component: PlacesComponent
      },
      {
        path: 'places/create',
        component: PlaceFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
