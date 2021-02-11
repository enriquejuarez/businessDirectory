import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PlaceDetailComponent } from './components/place-detail/place-detail.component';
import { PlaceFormComponent } from './components/place-form/place-form.component';

import { AuthGuard } from './../../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'detail/:id',
    component: PlaceDetailComponent
  },
  {
    path: 'create/:id',
    component: PlaceFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
