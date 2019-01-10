import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlePreviewInfoAreaComponent } from './article-preview-info-area.component';

describe('ArticlePreviewInfoAreaComponent', () => {
  let component: ArticlePreviewInfoAreaComponent;
  let fixture: ComponentFixture<ArticlePreviewInfoAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlePreviewInfoAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlePreviewInfoAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
