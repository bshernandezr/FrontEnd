import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { City } from 'src/app/models/City';
import { Response } from 'src/app/models/Response';
import { NavigationComponent } from '../../navigation/navigation.component';
import { CityListComponent } from '../city-list/city-list.component';

import { CityFormComponent } from './city-form.component';

describe('CityFormComponent', () => {
  let component: CityFormComponent;
  let fixture: ComponentFixture<CityFormComponent>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'City',
            component: CityListComponent,
          },
        ]),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [CityFormComponent, NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('editContext', () => {
    const res: City = { id: 1 };
    spyOn(component.cityService, 'readCityById').and.returnValue(of(res));
    component.ngOnInit();
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    expect(component.editFlag).toBeFalsy();
  });

  it('creation success', () => {
    const res: Response = { msg: 'Created successfully' };
    spyOn(component.cityService, 'createCity').and.returnValue(of(res));
    component.createCity();
    expect(component.responseCU).toEqual(res);
  });
  it('creation failed', () => {
    const res: Response = { msg: 'Another msg' };
    spyOn(component.cityService, 'createCity').and.returnValue(of(res));
    spyOn(window, 'alert');
    component.createCity();
    expect(window.alert).toHaveBeenCalledWith(res.msg);
  });
  it('edit success', () => {
    const res: Response = { msg: 'Updated successfully' };
    spyOn(component.cityService, 'editCity').and.returnValue(of(res));
    component.editCity();
    expect(component.responseCU).toEqual(res);
  });
  it('edit failed', () => {
    const res: Response = { msg: 'Another msg' };
    spyOn(component.cityService, 'editCity').and.returnValue(of(res));
    spyOn(window, 'alert');
    component.editCity();
    expect(window.alert).toHaveBeenCalledWith(res.msg);
  });
  it('Valid form', () => {
    component.cityForm.controls['id'].setValue(2);
    component.cityForm.controls['name'].setValue('name');
    component.cityForm.controls['population'].setValue(200);
    component.cityForm.controls['recommendedHotel'].setValue('Hotel');
    component.cityForm.controls['touristicPlace'].setValue('Place');
    component.onSubmit();
    expect(component.cityForm.valid).toBeTruthy();
    expect(component.submitFlag).toBeFalsy();
  });
  it('invalid form', () => {
    component.cityForm.controls['id'].setValue(2);
    component.cityForm.controls['name'].setValue('name');
    component.cityForm.controls['population'].setValue(-200);
    component.cityForm.controls['recommendedHotel'].setValue('Hotel');
    component.cityForm.controls['touristicPlace'].setValue('Place');
    component.onSubmit();
    expect(component.cityForm.valid).toBeFalsy();
    expect(component.submitFlag).toBeTruthy();
  });
});
