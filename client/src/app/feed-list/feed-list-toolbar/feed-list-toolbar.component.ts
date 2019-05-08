import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feed-list-toolbar',
  templateUrl: './feed-list-toolbar.component.html',
  styleUrls: ['./feed-list-toolbar.component.css']
})
export class FeedListToolbarComponent implements OnInit {
  faSearch = faSearch;

  constructor() {}

  ngOnInit() {}
}
