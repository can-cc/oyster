import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultTagsComponent } from './default-tags.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DefaultTagsComponent', () => {
  let component: DefaultTagsComponent;
  let fixture: ComponentFixture<DefaultTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultTagsComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
