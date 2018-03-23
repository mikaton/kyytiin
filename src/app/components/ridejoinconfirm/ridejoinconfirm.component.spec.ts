import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideJoinConfirmComponent } from './ridejoinconfirm.component';

describe('RidejoinconfirmComponent', () => {
  let component: RideJoinConfirmComponent;
  let fixture: ComponentFixture<RideJoinConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideJoinConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideJoinConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
