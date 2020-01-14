import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedSourceItemComponent } from './feed-source-item.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';
import { Feed, FeedSource } from '../../../typing/feed';

describe('FeedSourceItemComponent', () => {
  let component: FeedSourceItemComponent;
  let fixture: ComponentFixture<FeedSourceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedSourceItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: Store, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedSourceItemComponent);
    component = fixture.componentInstance;
    component.source = {} as FeedSource
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
