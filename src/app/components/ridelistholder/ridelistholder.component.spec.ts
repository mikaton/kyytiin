import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidelistholderComponent } from './ridelistholder.component';

describe('RidelistholderComponent', () => {
  let component: RidelistholderComponent;
  let fixture: ComponentFixture<RidelistholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidelistholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidelistholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
