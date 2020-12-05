/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tourist } from 'src/app/models/Tourist';
import { TouristService } from '../../../services/tourist.service';
import { CityService } from '../../../services/city.service';
import { FormBuilder, Validators } from '@angular/forms';
import { City } from 'src/app/models/City';
import { Response } from 'src/app/models/Response';

@Component({
  selector: 'app-tourist-form',
  templateUrl: './tourist-form.component.html',
})
export class TouristFormComponent implements OnInit {
  tourist: Tourist = {
    id: '0',
  };
  editFlag = false;
  cities: City[] = [];
  submitFlag = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private touristService: TouristService,
    private cityService: CityService,
    private fb: FormBuilder
  ) {}

  touristForm = this.fb.group({
    id: [null, [Validators.required, Validators.min(1)]],
    name: [null, Validators.required],
    idType: ['CC', Validators.required],
    birthDate: [null, Validators.required],
    gender: ['M', Validators.required],
    travelFrecuency: [
      null,
      [Validators.required, Validators.min(1), Validators.max(36)],
    ],
    travelBudget: [null, [Validators.required, Validators.min(0)]],
    destination: [null, Validators.required],
    creditCard: [false],
  });

  ngOnInit(): void {
    this.cityService.readAllCities().subscribe(
      (res) => (this.cities = res as City[]),
      (err) => console.log(err)
    );
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.touristService.readTouristById(params.id).subscribe(
        (res) => {
          this.touristForm.setValue(res);
          this.editFlag = true;
        },
        (err) => console.log(err)
      );
    }
  }

  /**
   * Use the tourist service for create a tourist in the database
   * with the current local tourist object
   */
  createTourist(): void {
    this.touristService.createTourist(this.tourist).subscribe(
      (res) => this.verifyCreation(res as Response),
      (err) => console.log(err)
    );
  }

  /**
   * Verify the response of the API in a edit/create operation
   *
   * @param res Responde of the API
   */
  verifyCreation(res: Response): void {
    if (
      res.msg == 'Created successfully' ||
      res.msg == 'Updated successfully'
    ) {
      this.router.navigate(['/Tourist']);
    } else {
      alert(res.msg);
    }
  }

  /**
   * Use the tourist service for edit a tourist in the database with the
   * current local tourist object
   */
  editTourist(): void {
    this.touristService.editTourist(this.tourist).subscribe(
      (res) => {
        this.verifyCreation(res as Response);
        this.editFlag = false;
      },
      (err) => console.log(err)
    );
  }

  /**
   * Verify the form, if is correct call the create/edit
   */
  onSubmit(): void {
    if (this.touristForm.valid) {
      this.submitFlag = false;
      this.tourist = this.touristForm.value;
      this.editFlag ? this.editTourist() : this.createTourist();
    } else {
      this.submitFlag = true;
    }
  }
}
