/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Travel } from 'src/app/models/Travel';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
})
export class TravelListComponent implements OnInit {
  travels: Travel[] = [];
  touristFilterFlag = false;
  cityFilterFlag = false;

  constructor(private travelService: TravelService, private fb: FormBuilder) {}

  filterForm = this.fb.group({
    idTourist: [''],
    cityName: [''],
  });

  ngOnInit(): void {
    this.readAllTravels();
  }

  /**
   * Use the travelService for read all the cities and update the local
   * travels array object
   */
  readAllTravels(): void {
    this.travelService.readAllTravels().subscribe(
      (res) => (this.travels = res as Travel[]),
      (err) => console.log(err)
    );
  }

  /**
   * Use the travelService for delete a travel using his id
   * @param id  Number that corresponds with a travel id
   */
  deleteTravel(id: number): void {
    this.travelService.deleteTravelById(id).subscribe(
      (res) => {
        this.readAllTravels();
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  /**
   * If the tourist filter input change, use the travelservice for
   * read the travel table filter by the value of the input.
   * if in the change the input is empty readAlltravels without filter
   */
  onChangeTouristFilter(): void {
    if (this.filterForm.controls['idTourist'].value != '') {
      this.touristFilterFlag = true;
      this.readTravelsByIdTourist(this.filterForm.controls['idTourist'].value);
    } else {
      this.touristFilterFlag = false;
      this.readAllTravels();
    }
  }

  /**
   * Use the travelservice for read the travel filter by id of a tourist
   * and update the local travels array
   *
   * @param idTourist string that corresponds with an id of the tourist
   */
  readTravelsByIdTourist(idTourist: string): void {
    this.travelService.filterTravelsByTourist(idTourist).subscribe(
      (res) => (this.travels = res as Travel[]),
      (err) => console.log(err)
    );
  }

  /**
   * Use the travelservice for read the travel filter by city nam
   * and update the local travels array
   *
   * @param cityName string that corrresponds with a name of a city
   */
  readTravelsByCity(cityName: string): void {
    this.travelService.filterTravelsByCity(cityName).subscribe(
      (res) => (this.travels = res as Travel[]),
      (err) => console.log(err)
    );
  }

  /**
   * If the city filter input change, use the cityservice for
   * read the city table filter by the value of the input.
   * if in the change the input is empty readAlltravels without filter
   */
  onChangeCityFilter(): void {
    if (this.filterForm.controls['cityName'].value != '') {
      this.cityFilterFlag = true;
      this.readTravelsByCity(this.filterForm.controls['cityName'].value);
    } else {
      this.cityFilterFlag = false;
      this.readAllTravels();
    }
  }
}
