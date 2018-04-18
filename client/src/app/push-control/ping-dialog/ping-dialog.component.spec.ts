import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingDialogComponent } from './ping-dialog.component';

describe('PingDialogComponent', () => {
  let component: PingDialogComponent;
  let fixture: ComponentFixture<PingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
