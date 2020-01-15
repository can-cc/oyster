import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMessageComponent } from './field-message.component';

describe('FieldMessageComponent', () => {
  let component: FieldMessageComponent;
  let fixture: ComponentFixture<FieldMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
