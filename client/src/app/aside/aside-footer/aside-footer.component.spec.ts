import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideFooterComponent } from './aside-footer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material';

describe('AsideFooterComponent', () => {
  let component: AsideFooterComponent;
  let fixture: ComponentFixture<AsideFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsideFooterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MatDialogModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
