import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAvatarComponent } from './article-avatar.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ColorService } from '../color.service';
import { Feed } from '../../typing/feed';

describe('ArticleAvatarComponent', () => {
  let component: ArticleAvatarComponent;
  let fixture: ComponentFixture<ArticleAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleAvatarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        ColorService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAvatarComponent);
    component = fixture.componentInstance;
    component.feed = {
      source: {
        id: '123',
        url: 'xx',
        name: 'xixi'
      }
    } as Feed
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
