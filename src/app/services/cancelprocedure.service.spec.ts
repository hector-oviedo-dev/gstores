import { TestBed, inject } from '@angular/core/testing';

import { CancelprocedureService } from './cancelprocedure.service';

describe('CancelprocedureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CancelprocedureService]
    });
  });

  it('should be created', inject([CancelprocedureService], (service: CancelprocedureService) => {
    expect(service).toBeTruthy();
  }));
});
