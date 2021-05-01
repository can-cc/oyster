import {Component, OnInit, forwardRef, Input, OnDestroy, HostBinding, SimpleChanges} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faLink, faAtom, faUser, faKey, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faRegistered } from '@fortawesome/free-regular-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const faIconMap = {
  faLink,
  faRegistered,
  faAtom,
  faUser,
  faKey,
  faSearch
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
export class InputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() icon?: string;
  @Input() placeholder = '';
  @Input() iconColor?: string;
  @Input() type = 'text';
  @Input() size = 'md';

  @HostBinding('class') ngClass: string;

  control = new FormControl('');
  iconMap = faIconMap;

  complete$ = new Subject();

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit() {
    this.buildClass();
    this.control.valueChanges.pipe(takeUntil(this.complete$)).subscribe((value: any) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.control.setValue(value);
  }

  buildClass(): void {
    this.ngClass = [this.size, this.icon ? 'has-icon' : ''].join(' ');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.type) {
      this.buildClass();
    }
  }


  ngOnDestroy() {
    this.complete$.next();
    this.complete$.complete();
  }
}
