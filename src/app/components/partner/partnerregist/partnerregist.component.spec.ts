import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerregistComponent } from './partnerregist.component';

describe('PartnerregistComponent', () => {
  let component: PartnerregistComponent;
  let fixture: ComponentFixture<PartnerregistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerregistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerregistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
