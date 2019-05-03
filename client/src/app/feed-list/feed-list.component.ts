import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import { formatDistance } from 'date-fns';
import { Feed } from '../../typing/feed';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  @Input()
  feeds: Feed[];

  @Input()
  categoryId: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  public calcPublishedDistance(time: number) {
    return formatDistance(new Date(), new Date(time), {
      includeSeconds: false
    });
  }

  public trackByFeed(index: number, feed: Feed): string {
    return feed.id;
  }
}
