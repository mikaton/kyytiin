import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidecreateComponent } from './ridecreate.component';

describe('RidecreateComponent', () => {
  let component: RidecreateComponent;
  let fixture: ComponentFixture<RidecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
