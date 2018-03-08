import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthDialogComponent } from './auth-dialog.component';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTab } from '@angular/material/tabs/typings/tab';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthDialogComponent ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        FormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    fixture.destroy();
  });
});

