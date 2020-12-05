/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/City';
import { Observable } from 'rxjs';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  API_URI = 'http://localhost:8080/City';

  constructor(private http: HttpClient) {}

  /**
   * Read all cities in the database
   *
   * @returns Json with all the cities in the database
   */
  readAllCities() {
    return this.http.get(`${this.API_URI}/read`);
  }

  /**
   * Read a city in the database by the id
   *
   * @returns Json with the city
   */
  readCityById(id: number): Observable<City> {
    return this.http.get<City>(`${this.API_URI}/read/${id}`);
  }

  /**
   * Create a city in the database
   *
   * @param city City object that will be created in the database
   * @returns Message with the response for the create request
   */
  createCity(city: City): Observable<Response> {
    return this.http.post<Response>(`${this.API_URI}/create`, city);
  }

  /**
   * Delete a city in the databasae
   *
   * @param id Number with the id of the city in the database
   * @returns Message with the response for the delete request
   */
  deleteCity(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.API_URI}/delete/${id}`);
  }

  /**
   * Edit a city in the database
   *
   * @param city City object that will be edited in the database
   * @returns Message with the response for the edit request
   */
  editCity(city: City): Observable<Response> {
    return this.http.put<Response>(`${this.API_URI}/edit`, city);
  }
}
