import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormupdateComponent } from './formupdate.component';

describe('FormupdateComponent', () => {
  let component: FormupdateComponent;
  let fixture: ComponentFixture<FormupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
