import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePreviewInfoAreaComponent } from './article-preview-info-area.component';
import { Feed } from '../../../typing/feed';

describe('ArticlePreviewInfoAreaComponent', () => {
  let component: ArticlePreviewInfoAreaComponent;
  let fixture: ComponentFixture<ArticlePreviewInfoAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlePreviewInfoAreaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePreviewInfoAreaComponent);
    component = fixture.componentInstance;
    component.feed = {source: {}} as Feed;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
