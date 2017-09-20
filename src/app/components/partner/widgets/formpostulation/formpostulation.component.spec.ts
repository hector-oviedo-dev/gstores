import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpostulationComponent } from './formpostulation.component';

describe('FormpostulationComponent', () => {
  let component: FormpostulationComponent;
  let fixture: ComponentFixture<FormpostulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormpostulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpostulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
