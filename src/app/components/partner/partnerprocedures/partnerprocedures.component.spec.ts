import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerproceduresComponent } from './partnerprocedures.component';

describe('PartnerproceduresComponent', () => {
  let component: PartnerproceduresComponent;
  let fixture: ComponentFixture<PartnerproceduresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerproceduresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerproceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
