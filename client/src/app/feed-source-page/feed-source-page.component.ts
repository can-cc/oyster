import { Component, OnInit } from '@angular/core';
import { FeedSourceService } from '../core/feed-source.service';
import { Store } from '@ngrx/store';
import { FeedSource, StoreType } from '../../typing/feed';
import { GetSources } from '../state/feed.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-feed-source-page',
  templateUrl: './feed-source-page.component.html',
  styleUrls: ['./feed-source-page.component.css']
})
export class FeedSourcePageComponent implements OnInit {
  feedSources: FeedSource[];

  constructor(
    private store: Store<StoreType>
  ) {
    this.store.pipe(map((store: StoreType) => {
      return store.feed.feedSources;
    })).subscribe(sources => {
      this.feedSources = sources;
    })
  }

  ngOnInit() {
    this.store.dispatch(new GetSources());
  }
}
