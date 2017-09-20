import { TestBed, inject } from '@angular/core/testing';

import { RemoveaddressService } from './removeaddress.service';

describe('RemoveaddressService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveaddressService]
    });
  });

  it('should be created', inject([RemoveaddressService], (service: RemoveaddressService) => {
    expect(service).toBeTruthy();
  }));
});
