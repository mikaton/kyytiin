import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderequestComponent } from './riderequest.component';

describe('RiderequestComponent', () => {
  let component: RiderequestComponent;
  let fixture: ComponentFixture<RiderequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
