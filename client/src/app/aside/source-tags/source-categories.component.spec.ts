import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceCategoriesComponent } from './source-categories.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SourceTagsComponent', () => {
  let component: SourceCategoriesComponent;
  let fixture: ComponentFixture<SourceCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SourceCategoriesComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
