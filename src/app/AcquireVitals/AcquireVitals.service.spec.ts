/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AcquireVitalsService } from './AcquireVitals.service';

describe('Service: AcquireVitals', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcquireVitalsService]
    });
  });

  it('should ...', inject([AcquireVitalsService], (service: AcquireVitalsService) => {
    expect(service).toBeTruthy();
  }));
});
