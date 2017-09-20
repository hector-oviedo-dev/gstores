import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcancelComponent } from './formcancel.component';

describe('FormcancelComponent', () => {
  let component: FormcancelComponent;
  let fixture: ComponentFixture<FormcancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormcancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
