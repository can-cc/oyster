import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarO } from '@fortawesome/free-regular-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, switchMap, publish, share, takeUntil } from 'rxjs/operators';
import { Feed } from '../../typing/feed';
import { FeedMarkService } from '../core/feed-mark.service';

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

  faBookmark = faBookmark;

  faStar = faStarO;

  constructor(
    private feedMarkService: FeedMarkService,
    private store: Store<{
      feed: {
        feedMap: { [id: string]: Feed };
      };
    }>
  ) {
    this.fidChange$
      .pipe(
        takeUntil(this.complete$),
        switchMap(() => this.store.pipe(map(store => store.feed.feedMap[this.feedId])))
      )
      .subscribe((feed: Feed) => {
        this.feed = feed;
      });
  }

  ngOnInit() {}

  handleFavoriteIconClick() {
    this.feedMarkService.markFeedFavorite(this.feedId);
  }

  ngOnDestroy() {
    this.complete$.next();
    this.complete$.complete();
    this.fidChange$.complete();
  }
}
