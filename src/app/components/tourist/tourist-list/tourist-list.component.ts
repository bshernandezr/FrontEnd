/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Tourist } from 'src/app/models/Tourist';
import { TouristService } from '../../../services/tourist.service';

@Component({
  selector: 'app-tourist-list',
  templateUrl: './tourist-list.component.html',
  styleUrls: ['./tourist-list.component.css'],
})
export class TouristListComponent implements OnInit {
  tourists: Tourist[] = [];

  constructor(private touristService: TouristService) {}

  ngOnInit(): void {
    this.readAllTourist();
  }

  /**
   * Use the touristService for read all the tourist and asign it to
   * local tourist array if the requesty is correct
   *
   */
  readAllTourist(): void {
    this.touristService.readAllTourist().subscribe(
      (res) => (this.tourists = res as Tourist[]),
      (err) => console.log(err)
    );
  }

  /**
   * Use the touristService for delete a tourist using his id
   *
   * @param id Id that correspond with an id of a tourist
   */
  deleteTourist(id: string): void {
    if (confirm('Are you sure you want to delete this tourist?'))
      this.touristService.deleteTourist(id).subscribe(
        (res) => {
          this.readAllTourist();
          console.log(res);
        },
        (err) => console.log(err)
      );
  }
}
