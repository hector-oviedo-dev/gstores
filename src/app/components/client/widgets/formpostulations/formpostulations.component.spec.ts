import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpostulationsComponent } from './formpostulations.component';

describe('FormpostulationsComponent', () => {
  let component: FormpostulationsComponent;
  let fixture: ComponentFixture<FormpostulationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormpostulationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpostulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
