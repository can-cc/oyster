import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePreviewToolbarComponent } from './article-preview-toolbar.component';

describe('ArticlePreviewToolbarComponent', () => {
  let component: ArticlePreviewToolbarComponent;
  let fixture: ComponentFixture<ArticlePreviewToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePreviewToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePreviewToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
