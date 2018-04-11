import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit {
  @Input() feeds: Feed[];
  @Output() select: EventEmitter<Feed> = new EventEmitter();

  selectIndex: number;

  ngOnInit() {}
}
