import { Component, OnInit } from '@angular/core';
import { FeedSourceService } from '../core/feed-source.service';

@Component({
  selector: 'app-feed-source-page',
  templateUrl: './feed-source-page.component.html',
  styleUrls: ['./feed-source-page.component.css']
})
export class FeedSourcePageComponent implements OnInit {
  constructor(public feedSourceService: FeedSourceService) {}

  ngOnInit() {
    this.feedSourceService.querySourceList();
  }
}
