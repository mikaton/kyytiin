import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FrontpageComponent,
        AuthDialogComponent
      ],
      imports: [
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatTabsModule,
        FormsModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
