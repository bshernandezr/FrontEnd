import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityFormComponent } from './components/city/city-form/city-form.component';
import { CityListComponent } from './components/city/city-list/city-list.component';
import { MainComponent } from './components/main/main.component';
import { TouristFormComponent } from './components/tourist/tourist-form/tourist-form.component';
import { TouristListComponent } from './components/tourist/tourist-list/tourist-list.component';
import { TravelFormComponent } from './components/travel/travel-form/travel-form.component';
import { TravelListComponent } from './components/travel/travel-list/travel-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: MainComponent,
  },
  {
    path: 'City',
    component: CityListComponent,
  },
  {
    path: 'City/create',
    component: CityFormComponent,
  },
  {
    path: 'City/edit/:id',
    component: CityFormComponent,
  },
  {
    path: 'Tourist',
    component: TouristListComponent,
  },
  {
    path: 'Tourist/edit/:id',
    component: TouristFormComponent,
  },
  {
    path: 'Tourist/create',
    component: TouristFormComponent,
  },
  {
    path: 'Travel',
    component: TravelListComponent,
  },
  {
    path: 'Travel/create',
    component: TravelFormComponent,
  },
  {
    path: 'Travel/edit/:id',
    component: TravelFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
