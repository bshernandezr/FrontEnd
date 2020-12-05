import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Travel } from '../models/Travel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  API_URI = 'http://localhost:8080/Travel';

  constructor(private http: HttpClient) {}

  /**
   * Read all cities in the database
   *
   * @returns Json with all the cities in the database
   */
  readAllTravels(): Observable<Travel[]> {
    return this.http.get<Travel[]>(`${this.API_URI}/read`);
  }

  /**
   * Read a travel in the database by the id
   *
   * @returns Json with the travel
   */
  readTravelById(id: number): Observable<Travel> {
    return this.http.get<Travel>(`${this.API_URI}/read/${id}`);
  }

  /**
   * Read a travel in the database by the id
   *
   * @returns Json with the travel
   */
  filterTravelsByTourist(id: string): Observable<Travel[]> {
    return this.http.get<Travel[]>(`${this.API_URI}/filter/tourist/${id}`);
  }

  /**
   * Read a travel in the database by the id
   *
   * @returns Json with the travel
   */
  filterTravelsByCity(name: string): Observable<Travel[]> {
    return this.http.get<Travel[]>(`${this.API_URI}/filter/city/${name}`);
  }

  /**
   * Create a travel in the database
   *
   * @param travel travel object that will be created in the database
   * @returns Message with the response for the create request
   */
  createTravel(travel: Travel): Observable<Response> {
    return this.http.post<Response>(`${this.API_URI}/create`, travel);
  }

  /**
   * Delete a travel in the databasae
   *
   * @param id Number with the id of the travel in the database
   * @returns Message with the response for the delete request
   */
  deleteTravelById(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.API_URI}/delete/${id}`);
  }

  /**
   * Edit a travel in the database
   *
   * @param travel travel object that will be edited in the database
   * @returns Message with the response for the edit request
   */
  editTravel(id: number, travel: Travel): Observable<Response> {
    return this.http.put<Response>(`${this.API_URI}/edit/${id}`, travel);
  }
}
