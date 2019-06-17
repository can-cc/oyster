import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faLink } from '@fortawesome/free-solid-svg-icons';

export const faIconMap = {
  faLink: faLink
};

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent)
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() icon: string;

  control = new FormControl('');
  iconMap = faIconMap;

  onChange: any = () => {};
  onTouched: any = () => {};


  constructor() {}

  ngOnInit() {}

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.control.setValue(value);
  }
}
