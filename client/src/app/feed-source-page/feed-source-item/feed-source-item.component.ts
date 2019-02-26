import { Component, OnInit, Input } from '@angular/core';
import { FeedSource, StoreType } from '../../../typing/feed';
import { Store } from '@ngrx/store';
import { RemoveSource } from '../../state/feed.actions';

@Component({
  selector: 'app-feed-source-item',
  templateUrl: './feed-source-item.component.html',
  styleUrls: ['./feed-source-item.component.css']
})
export class FeedSourceItemComponent implements OnInit {
  @Input()
  source: FeedSource;

  constructor(private store: Store<StoreType>) {}

  ngOnInit() {}

  public remove(): void {
    this.store.dispatch(new RemoveSource({id: this.source.id}));
  }
}
