import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerlistrequestsComponent } from './partnerlistrequests.component';

describe('PartnerlistrequestsComponent', () => {
  let component: PartnerlistrequestsComponent;
  let fixture: ComponentFixture<PartnerlistrequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerlistrequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerlistrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
