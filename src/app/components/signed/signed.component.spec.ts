import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedComponent } from './signed.component';

describe('SignedComponent', () => {
  let component: SignedComponent;
  let fixture: ComponentFixture<SignedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
