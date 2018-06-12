import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderequestCreateComponent } from './riderequest-create.component';

describe('RiderequestCreateComponent', () => {
  let component: RiderequestCreateComponent;
  let fixture: ComponentFixture<RiderequestCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderequestCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
