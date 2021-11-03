/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddPatientService } from './addPatient.service';

describe('Service: AddPatient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddPatientService]
    });
  });

  it('should ...', inject([AddPatientService], (service: AddPatientService) => {
    expect(service).toBeTruthy();
  }));
});
