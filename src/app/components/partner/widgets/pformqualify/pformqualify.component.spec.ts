import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PformqualifyComponent } from './pformqualify.component';

describe('PformqualifyComponent', () => {
  let component: PformqualifyComponent;
  let fixture: ComponentFixture<PformqualifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PformqualifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PformqualifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
