import { Component, OnInit } from '@angular/core';
import { faLink, faRegistered } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-feed-source-modal',
  templateUrl: './add-feed-source-modal.component.html',
  styleUrls: ['./add-feed-source-modal.component.css']
})
export class AddFeedSourceModalComponent implements OnInit {
  public faLink = faLink;
  public faRegistered = faRegistered;

  constructor() { }

  ngOnInit() {}

}
