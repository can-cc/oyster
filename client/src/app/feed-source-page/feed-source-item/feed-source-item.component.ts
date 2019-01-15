import { Component, OnInit, Input } from '@angular/core';
import { FeedSource } from '../../../typing/feed';

@Component({
  selector: 'app-feed-source-item',
  templateUrl: './feed-source-item.component.html',
  styleUrls: ['./feed-source-item.component.css']
})
export class FeedSourceItemComponent implements OnInit {
  @Input()
  source: FeedSource;

  constructor() {}

  ngOnInit() {}
}
