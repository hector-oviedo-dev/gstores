import { TestBed, inject } from '@angular/core/testing';

import { ModifyaccountService } from './modifyaccount.service';

describe('ModifyaccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModifyaccountService]
    });
  });

  it('should be created', inject([ModifyaccountService], (service: ModifyaccountService) => {
    expect(service).toBeTruthy();
  }));
});
