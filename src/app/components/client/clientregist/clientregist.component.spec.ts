import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientregistComponent } from './clientregist.component';

describe('ClientregistComponent', () => {
  let component: ClientregistComponent;
  let fixture: ComponentFixture<ClientregistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientregistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientregistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
