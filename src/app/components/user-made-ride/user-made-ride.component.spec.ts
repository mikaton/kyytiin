import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMadeRideComponent } from './user-made-ride.component';

describe('UserMadeRideComponent', () => {
  let component: UserMadeRideComponent;
  let fixture: ComponentFixture<UserMadeRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMadeRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMadeRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
