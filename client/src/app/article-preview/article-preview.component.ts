import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Feed } from '../../typing/feed';
import { FeedMarkService } from '../core/feed-mark.service';
import { MarkFeedFavorite, RemoveFeedMark } from '../state/feed.actions';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit, OnDestroy {
  private fid: string;

  @Input()
  set feedId(id) {
    this.fid = id;
    this.fidChange$.next();
  }

  get feedId() {
    return this.fid;
  }

  fidChange$: Subject<void> = new Subject<void>();

  feed: Feed;
  complete$ = new Subject();

  constructor(
    private store: Store<{
      feed: {
        feedMap: { [id: string]: Feed };
      };
    }>
  ) {
    this.fidChange$
      .pipe(
        takeUntil(this.complete$),
        switchMap(() => this.store.pipe(map(storeValue => storeValue.feed.feedMap[this.feedId])))
      )
      .subscribe((feed: Feed) => {
        this.feed = feed;
      });
  }

  ngOnInit() {}

  handleMarkFavorite() {
    const isFavorite = this.feed.marks.length > 0;
    if (!isFavorite) {
      this.store.dispatch(new MarkFeedFavorite({ feedId: this.feed.id }));
    } else {
      this.store.dispatch(
        new RemoveFeedMark({ feedId: this.feed.id, markId: this.feed.marks[0].id })
      );
    }
  }

  ngOnDestroy() {
    this.complete$.next();
    this.complete$.complete();
    this.fidChange$.complete();
  }
}
