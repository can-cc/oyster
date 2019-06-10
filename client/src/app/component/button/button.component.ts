import { Component, OnInit, Input } from '@angular/core';

export type ButtonSize = 'large' | 'middle' | 'small';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() size: ButtonSize = 'middle';

  constructor() { }

  ngOnInit() {}

}
