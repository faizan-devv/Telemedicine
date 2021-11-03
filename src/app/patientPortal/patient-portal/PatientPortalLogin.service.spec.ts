/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatientPortalLoginService } from './PatientPortalLogin.service';

describe('Service: PatientPortalLogin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientPortalLoginService]
    });
  });

  it('should ...', inject([PatientPortalLoginService], (service: PatientPortalLoginService) => {
    expect(service).toBeTruthy();
  }));
});
