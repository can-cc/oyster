import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideStatusSwitchComponent } from './aside-status-switch.component';

describe('AsideStatusSwitchComponent', () => {
  let component: AsideStatusSwitchComponent;
  let fixture: ComponentFixture<AsideStatusSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsideStatusSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideStatusSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
