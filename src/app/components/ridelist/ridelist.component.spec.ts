import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidelistComponent } from './ridelist.component';

describe('RidelistComponent', () => {
  let component: RidelistComponent;
  let fixture: ComponentFixture<RidelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
