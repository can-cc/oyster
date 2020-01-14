import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedSourceModalComponent } from './add-feed-source-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { ColorService } from '../color.service';

describe('AddFeedSourceModalComponent', () => {
  let component: AddFeedSourceModalComponent;
  let fixture: ComponentFixture<AddFeedSourceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeedSourceModalComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: Store,
          useValue: {}
        },
        ColorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedSourceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
