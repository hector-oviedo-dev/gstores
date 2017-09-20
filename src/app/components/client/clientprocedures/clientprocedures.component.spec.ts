import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientproceduresComponent } from './clientprocedures.component';

describe('ClientproceduresComponent', () => {
  let component: ClientproceduresComponent;
  let fixture: ComponentFixture<ClientproceduresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientproceduresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientproceduresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
