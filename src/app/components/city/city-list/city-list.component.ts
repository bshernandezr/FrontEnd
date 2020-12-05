/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { CityService } from '../../../services/city.service';
import { City } from 'src/app/models/City';
import { Response } from 'src/app/models/Response';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
})
export class CityListComponent implements OnInit {
  cities: City[] = [];
  error = false;
  deleteResponse: Response = {};

  constructor(public cityService: CityService) {}

  ngOnInit(): void {
    this.readAllCities();
  }

  /**
   * Use the cityService for read all the cities an asign the response to
   * local cities array if the request is correct
   */
  readAllCities(): void {
    this.cityService.readAllCities().subscribe((res) => {
      this.cities = res as City[];
      this.error = false;
    });
  }

  /**
   * Use the cityService for delete a city using the id
   *
   * @param id Number that correspond with the id of the city
   */
  deleteCity(id: number): void {
    if (confirm('Are you sure you want to delete this city?')) {
      this.cityService.deleteCity(id).subscribe((res) => {
        this.readAllCities();
        this.deleteResponse = res as Response;
      });
    }
  }
}
