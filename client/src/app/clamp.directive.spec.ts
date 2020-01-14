import { ClampDirective } from './clamp.directive';
import { ElementRef } from '@angular/core';

describe('ClampDirective', () => {
  it('should create an instance', () => {
    const directive = new ClampDirective(new ElementRef(document.createElement('div')));
    expect(directive).toBeTruthy();
  });
});
