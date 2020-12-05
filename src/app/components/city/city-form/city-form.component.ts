/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { City } from 'src/app/models/City';
import { CityService } from 'src/app/services/city.service';
import { Response } from 'src/app/models/Response';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
})
export class CityFormComponent implements OnInit {
  city: City = {
    id: 0,
  };
  editFlag = false;
  submitFlag = false;
  responseCU: Response = {};
  id = null;

  constructor(
    public cityService: CityService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ngZone: NgZone
  ) {}

  cityForm = this.fb.group({
    id: ['', [Validators.required, Validators.min(1)]],
    name: ['', Validators.required],
    population: ['', [Validators.required, Validators.min(1)]],
    touristicPlace: ['', Validators.required],
    recommendedHotel: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.paramMap.get('id') != null) {
      this.cityService
        .readCityById(this.activatedRoute.snapshot.params.id)
        .subscribe((res) => {
          this.cityForm.setValue(res);
          this.editFlag = true;
      });
    }
  }

  /**
   * Use the cityService for create a city with the current data of city
   * object
   */
  createCity(): void {
    this.cityService.createCity(this.city).subscribe((res) => {
      this.responseCU = res as Response;
      if (this.responseCU.msg == 'Created successfully') {
        this.ngZone.run(() => this.router.navigate(['/City']));
      } else {
        alert(res.msg);
      }
    });
  }

  /**
   * Use the cityService for edit a city with the current data of city
   * object
   */
  editCity(): void {
    this.cityService.editCity(this.city).subscribe((res) => {
      this.responseCU = res as Response;
      if (this.responseCU.msg == 'Updated successfully') {
        this.editFlag = false;
        this.ngZone.run(() => this.router.navigate(['/City']));
      } else {
        alert(res.msg);
      }
    });
  }

  /**
   * Verify the form and edit or create a city
   */
  onSubmit(): void {
    if (this.cityForm.valid) {
      this.submitFlag = false;
      this.city = this.cityForm.value;
      this.editFlag ? this.editCity() : this.createCity();
    } else {
      this.submitFlag = true;
    }
  }
}
