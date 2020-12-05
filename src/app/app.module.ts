import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelListComponent } from './components/travel/travel-list/travel-list.component';
import { CityListComponent } from './components/city/city-list/city-list.component';
import { TouristListComponent } from './components/tourist/tourist-list/tourist-list.component';
import { TouristFormComponent } from './components/tourist/tourist-form/tourist-form.component';
import { CityFormComponent } from './components/city/city-form/city-form.component';
import { TravelFormComponent } from './components/travel/travel-form/travel-form.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CityService } from './services/city.service';
import { TouristService } from './services/tourist.service';
import { MainComponent } from './components/main/main.component';
import { TravelService } from './services/travel.service';

@NgModule({
  declarations: [
    AppComponent,
    TravelListComponent,
    CityListComponent,
    TouristListComponent,
    TouristFormComponent,
    CityFormComponent,
    TravelFormComponent,
    NavigationComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [CityService, TouristService, TravelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
