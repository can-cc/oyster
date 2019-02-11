import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Feed } from '../../typing/feed';
import { GetFeeds, CleanFeeds } from '../state/feed.actions';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-feeds-page',
  templateUrl: './feeds-page.component.html',
  styleUrls: ['./feeds-page.component.css']
})
export class FeedsPageComponent implements OnInit {
  pageLimit = 20;
  offset = 0;

  public feeds$: Observable<Feed[]>;
  public urlFeedId$: Observable<string>;

  private complete$: Subject<void> = new Subject();
  private category: string;

  constructor(
    private store: Store<{
      feed: {
        feedMap: { [id: string]: Feed };
        feedIds: string[];
      };
    }>,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.setUrlListener();

    this.feeds$ = store.pipe(
      map(({ feed }) => {
        return feed.feedIds.map(id => feed.feedMap[id]);
      })
    );
  }

  ngOnInit() {}

  private setUrlListener() {
    this.urlFeedId$ = this.route.paramMap.pipe(
      takeUntil(this.complete$),
      map((params: ParamMap) => params.get('feedId'))
    );

    this.route.paramMap.pipe(
      takeUntil(this.complete$),
      map((params: ParamMap) => params.get('category')),
      distinctUntilChanged((a: string, b: string) => {
        return a === b;
      }),
    ).subscribe((category: string) => {
      this.category = category;
      this.offset = 0;
      this.store.dispatch(new CleanFeeds());
      this.queryFeeds();
    });
  }

  public queryFeeds(): void {
    this.store.dispatch(
      new GetFeeds({ offset: this.offset, limit: this.pageLimit, category: this.category })
    );
    this.offset += this.pageLimit;
  }

  public resetOffset(): void {
    this.offset = 0;
  }

  public onFeedListSelect(feed: Feed) {
    this.route.paramMap
      .pipe(
        take(1),
        map((params: ParamMap) => params.get('category'))
      )
      .subscribe((category: string) => {
        this.router.navigate([`/feed/${category}/${feed.id}`]);
      });
  }
}
