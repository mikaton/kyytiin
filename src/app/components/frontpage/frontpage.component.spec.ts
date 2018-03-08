import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FrontpageComponent } from './frontpage.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbar } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FrontpageComponent', () => {
  let component: FrontpageComponent;
  let fixture: ComponentFixture<FrontpageComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FrontpageComponent,
        AuthDialogComponent
      ],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule,
        FormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


