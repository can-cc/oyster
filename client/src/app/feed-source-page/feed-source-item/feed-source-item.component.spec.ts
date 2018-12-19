import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedSourceItemComponent } from './feed-source-item.component';

describe('FeedSourceItemComponent', () => {
  let component: FeedSourceItemComponent;
  let fixture: ComponentFixture<FeedSourceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedSourceItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedSourceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
