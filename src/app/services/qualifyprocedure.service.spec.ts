import { TestBed, inject } from '@angular/core/testing';

import { QualifyprocedureService } from './qualifyprocedure.service';

describe('QualifyprocedureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QualifyprocedureService]
    });
  });

  it('should be created', inject([QualifyprocedureService], (service: QualifyprocedureService) => {
    expect(service).toBeTruthy();
  }));
});
