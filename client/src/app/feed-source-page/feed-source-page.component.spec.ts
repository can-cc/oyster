import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedSourcePageComponent } from './feed-source-page.component';

describe('FeedSourcePageComponent', () => {
  let component: FeedSourcePageComponent;
  let fixture: ComponentFixture<FeedSourcePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedSourcePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedSourcePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
