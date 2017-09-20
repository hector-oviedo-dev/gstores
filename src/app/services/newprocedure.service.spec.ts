import { TestBed, inject } from '@angular/core/testing';

import { NewprocedureService } from './newprocedure.service';

describe('NewprocedureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewprocedureService]
    });
  });

  it('should be created', inject([NewprocedureService], (service: NewprocedureService) => {
    expect(service).toBeTruthy();
  }));
});
