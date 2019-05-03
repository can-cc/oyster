import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aside-top-bar',
  templateUrl: './aside-top-bar.component.html',
  styleUrls: ['./aside-top-bar.component.css']
})
export class AsideTopBarComponent implements OnInit {
  faPlus = faPlus;

  constructor() {}

  ngOnInit() {}
}
