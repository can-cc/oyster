import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlePreviewStarComponent } from './article-preview-star.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ArticlePreviewStarComponent', () => {
  let component: ArticlePreviewStarComponent;
  let fixture: ComponentFixture<ArticlePreviewStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlePreviewStarComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePreviewStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
