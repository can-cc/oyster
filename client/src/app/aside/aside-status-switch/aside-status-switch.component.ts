import { Component, OnInit } from '@angular/core';

enum status {
  UNREAD = 'UNREAD',
  STARRED = 'STARRED',
  ALL = 'ALL'
}

@Component({
  selector: 'app-aside-status-switch',
  templateUrl: './aside-status-switch.component.html',
  styleUrls: ['./aside-status-switch.component.css']
})
export class AsideStatusSwitchComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
