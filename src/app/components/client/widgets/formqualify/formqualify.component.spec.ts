import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormqualifyComponent } from './formqualify.component';

describe('FormqualifyComponent', () => {
  let component: FormqualifyComponent;
  let fixture: ComponentFixture<FormqualifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormqualifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormqualifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
