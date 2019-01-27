import { Component, OnInit } from '@angular/core';
import { faListAlt, faBell, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.css']
})
export class SettingPageComponent implements OnInit {
  faListAlt = faListAlt;
  faBell = faBell;
  faArrowLeft = faArrowLeft;

  constructor() {}

  ngOnInit() {}
}
