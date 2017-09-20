import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmsuccessComponent } from './confirmsuccess.component';

describe('ConfirmsuccessComponent', () => {
  let component: ConfirmsuccessComponent;
  let fixture: ComponentFixture<ConfirmsuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmsuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
