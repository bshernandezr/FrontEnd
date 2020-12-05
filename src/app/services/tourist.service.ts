import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tourist } from '../models/Tourist';
import { Response } from '../models/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TouristService {
  API_URI = 'http://localhost:8080/Tourist';

  constructor(private http: HttpClient) {}

  /**
   * Read all cities in the database
   *
   * @returns Json with all the cities in the database
   */
  readAllTourist(): Observable<Tourist[]> {
    return this.http.get<Tourist[]>(`${this.API_URI}/read`);
  }

  /**
   * Read a tourist in the database by the id
   *
   * @returns Json with the tourist
   */
  readTouristById(id: string): Observable<Tourist> {
    return this.http.get<Tourist>(`${this.API_URI}/read/${id}`);
  }

  /**
   * Create a tourist in the database
   *
   * @param tourist tourist object that will be created in the database
   * @returns Message with the response for the create request
   */
  createTourist(tourist: Tourist): Observable<Response> {
    return this.http.post<Response>(`${this.API_URI}/create`, tourist);
  }

  /**
   * Delete a tourist in the databasae
   *
   * @param id Number with the id of the tourist in the database
   * @returns Message with the response for the delete request
   */
  deleteTourist(id: string): Observable<Response> {
    return this.http.delete<Response>(`${this.API_URI}/delete/${id}`);
  }

  /**
   * Edit a tourist in the database
   *
   * @param tourist tourist object that will be edited in the database
   * @returns Message with the response for the edit request
   */
  editTourist(tourist: Tourist): Observable<Response> {
    return this.http.put<Response>(`${this.API_URI}/edit`, tourist);
  }
}
