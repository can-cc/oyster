import { Component, OnInit, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import * as formatDistance from 'date-fns/formatDistance';
import { Feed } from '../../typing/feed';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  @Input() feeds: Feed[];
  @Output() select: EventEmitter<Feed> = new EventEmitter();

  selectIndex: number;

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  public calcPublishedDistance(time: number) {
    return formatDistance(new Date(), new Date(time));
  }

  public trackByFeed(index: number, feed: Feed): string {
    return feed.id;
  }
}
