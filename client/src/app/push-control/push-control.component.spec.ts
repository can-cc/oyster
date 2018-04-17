import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushControlComponent } from './push-control.component';

describe('PushControlComponent', () => {
  let component: PushControlComponent;
  let fixture: ComponentFixture<PushControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
