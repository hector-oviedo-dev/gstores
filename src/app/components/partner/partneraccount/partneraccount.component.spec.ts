import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartneraccountComponent } from './partneraccount.component';

describe('PartneraccountComponent', () => {
  let component: PartneraccountComponent;
  let fixture: ComponentFixture<PartneraccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartneraccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartneraccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
