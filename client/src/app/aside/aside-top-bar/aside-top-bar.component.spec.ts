import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsideTopBarComponent } from './aside-top-bar.component';

describe('AsideTopBarComponent', () => {
  let component: AsideTopBarComponent;
  let fixture: ComponentFixture<AsideTopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsideTopBarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
