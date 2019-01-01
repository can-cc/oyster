import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedSourceCreaterComponent } from './feed-source-creater.component';

describe('FeedSourceCreaterComponent', () => {
  let component: FeedSourceCreaterComponent;
  let fixture: ComponentFixture<FeedSourceCreaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedSourceCreaterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedSourceCreaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
