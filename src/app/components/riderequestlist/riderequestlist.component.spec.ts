import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderequestlistComponent } from './riderequestlist.component';

describe('RiderequestlistComponent', () => {
  let component: RiderequestlistComponent;
  let fixture: ComponentFixture<RiderequestlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderequestlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
