import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedListToolbarComponent } from './feed-list-toolbar.component';

describe('FeedListToolbarComponent', () => {
  let component: FeedListToolbarComponent;
  let fixture: ComponentFixture<FeedListToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedListToolbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedListToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
