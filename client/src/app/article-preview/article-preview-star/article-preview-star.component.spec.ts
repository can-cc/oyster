import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlePreviewStarComponent } from './article-preview-star.component';

describe('ArticlePreviewStarComponent', () => {
  let component: ArticlePreviewStarComponent;
  let fixture: ComponentFixture<ArticlePreviewStarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlePreviewStarComponent]
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
