/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/City';
import { Response } from 'src/app/models/Response';
import { Travel } from 'src/app/models/Travel';
import { CityService } from 'src/app/services/city.service';
import { TravelService } from 'src/app/services/travel.service';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
})
export class TravelFormComponent implements OnInit {
  editId = 0;
  travel: Travel = {
    id: 0,
  };
  city = '';
  cities: City[] = [];
  editFlag = false;
  submitFlag = false;

  constructor(
    private fb: FormBuilder,
    private travelService: TravelService,
    private router: Router,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute
  ) {}

  travelForm = this.fb.group({
    id: [''],
    idCity: ['', Validators.required],
    cityName: ['', Validators.required],
    idTourist: ['', Validators.required],
    travelDate: ['', Validators.required],
  });

  ngOnInit(): void {
    this.cityService.readAllCities().subscribe(
      (res) => (this.cities = res as City[]),
      (err) => console.log(err)
    );
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.travelService.readTravelById(params.id).subscribe(
        (res) => {
          this.editId = params.id;
          this.asignValues(res);
          this.editFlag = true;
        },
        (err) => console.log(err)
      );
    }
  }

  /**
   * Use the travel service to create a new Travel with the current travel local
   * array
   */
  createTravel(): void {
    this.travelService.createTravel(this.travel).subscribe(
      (res) => {
        this.validateCreate(res as Response);
      },
      (err) => console.log(err)
    );
  }

  /**
   * Verify the response of the API for a create/edit operation
   *
   * @param res Response message returned by the API
   */
  validateCreate(res: Response): void {
    if (
      res.msg == 'Created successfully' ||
      res.msg == 'Updated successfully'
    ) {
      this.editFlag = false;
      this.router.navigate(['/Travel']);
    } else {
      alert(res.msg);
    }
  }

  /**
   * Use the travelService for edit a travel using the current local
   * travel object
   */
  editTravel(): void {
    this.travelService.editTravel(this.editId, this.travel).subscribe(
      (res) => {
        this.validateCreate(res as Response);
      },
      (err) => console.log(err)
    );
  }

  /**
   * Show the id City automatically when cityName changes
   */
  updateIdCity(): void {
    this.city = this.travelForm.controls['cityName'].value;
    this.travelForm.controls['idCity'].setValue(this.city.split('-')[0]);
  }

  /**
   * Asign the values of the API response to the travelForms inputs
   * for edit the travel
   *
   * @param res Response with and travel object
   */
  asignValues(res: Travel): void {
    this.travelForm.controls['idTourist'].setValue(res.idTourist);
    this.travelForm.controls['cityName'].setValue(
      res.idCity + '-' + res.cityName
    );
    this.travelForm.controls['idCity'].setValue(res.idCity);
    this.travelForm.controls['travelDate'].setValue(res.travelDate);
  }

  /**
   * Verify the form, if is correct, update the local travel object and
   * call edit/travel operation
   */
  onSubmit(): void {
    if (this.travelForm.valid) {
      this.submitFlag = false;
      this.updateIdCity();
      this.travel.idCity = parseInt(this.city.split('-')[0]);
      this.travel.cityName = this.city.split('-')[1];
      this.travel.idTourist = this.travelForm.controls['idTourist'].value;
      this.travel.travelDate = this.travelForm.controls['travelDate'].value;
      this.editFlag ? this.editTravel() : this.createTravel();
    } else {
      this.submitFlag = true;
    }
  }
}
