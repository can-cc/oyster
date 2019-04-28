import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedListItemImagePreviewComponent } from './feed-list-item-image-preview.component';

describe('FeedListItemImagePreviewComponent', () => {
  let component: FeedListItemImagePreviewComponent;
  let fixture: ComponentFixture<FeedListItemImagePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedListItemImagePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedListItemImagePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
