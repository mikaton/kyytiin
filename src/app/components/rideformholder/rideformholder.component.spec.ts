import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideformholderComponent } from './rideformholder.component';

describe('RideformholderComponent', () => {
  let component: RideformholderComponent;
  let fixture: ComponentFixture<RideformholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideformholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideformholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
