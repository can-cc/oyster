import { Component, OnInit, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

export type ButtonSize = 'large' | 'middle' | 'small';

export type ButtonType = 'primary' | 'danger';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit, OnChanges {
  @Input() size: ButtonSize = 'middle';
  @Input() class: string;
  @Input() type: ButtonType;
  @Input() htmlType = 'button'

  @HostBinding('class') ngClass: string;

  constructor() {}

  ngOnInit() {
    this.buildClass();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type) {
      this.buildClass();
    }
  }

  buildClass(): void {
    this.ngClass = [this.class, this.type].join(' ');
  }
}
