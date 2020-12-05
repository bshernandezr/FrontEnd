import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TouristService } from './tourist.service';

describe('TouristService', () => {
  let service: TouristService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TouristService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
