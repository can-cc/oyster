import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAvatarComponent } from './article-avatar.component';

describe('ArticleAvatarComponent', () => {
  let component: ArticleAvatarComponent;
  let fixture: ComponentFixture<ArticleAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
