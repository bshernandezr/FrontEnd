import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CityListComponent } from './city-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { City } from 'src/app/models/City';
import { Response } from 'src/app/models/Response';
import { NavigationComponent } from '../../navigation/navigation.component';

describe('CityListComponent', () => {
  let component: CityListComponent;
  let fixture: ComponentFixture<CityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [CityListComponent, NavigationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(window, 'confirm').and.returnValue(true);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ReadAllCities test', () => {
    const res: City[] = [{ id: 1 }, { id: 2 }];
    spyOn(component.cityService, 'readAllCities').and.returnValue(of(res));
    component.readAllCities();
    expect(component.error).toBeFalsy();
    expect(component.cities).toEqual(res);
  });

  it('DeleteCity test', () => {
    const res: Response = { msg: 'Deleted successfully' };
    spyOn(component.cityService, 'deleteCity').and.returnValue(of(res));
    component.deleteCity(1);
    expect(component.error).toBeFalsy();
    expect(component.deleteResponse).toEqual(res);
  });
});
