import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedListItemImagePreviewComponent } from './feed-list-item-image-preview.component';
import { ColorService } from '../../color.service';
import { Feed } from '../../../typing/feed';

describe('FeedListItemImagePreviewComponent', () => {
  let component: FeedListItemImagePreviewComponent;
  let fixture: ComponentFixture<FeedListItemImagePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedListItemImagePreviewComponent],
      providers: [
        ColorService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedListItemImagePreviewComponent);
    component = fixture.componentInstance;
    component.feed = {source: {}} as Feed
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
