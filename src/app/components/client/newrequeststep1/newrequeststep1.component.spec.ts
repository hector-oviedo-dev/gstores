import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Newrequeststep1Component } from './newrequeststep1.component';

describe('Newrequeststep1Component', () => {
  let component: Newrequeststep1Component;
  let fixture: ComponentFixture<Newrequeststep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Newrequeststep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Newrequeststep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
