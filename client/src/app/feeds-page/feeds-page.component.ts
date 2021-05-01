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
  private searchStr$: Observable<string>;
  public searchStr: string = '';
  public urlFeedId$: Observable<string>;

  private complete$: Subject<void> = new Subject();
  public category: string;

  constructor(
    private store: Store<{
      feed: {
        feedMap: { [id: string]: Feed };
        feedIds: string[];
        searchStr: string;
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

    this.searchStr$ = store.pipe(map(({ feed }) => {
      return feed.searchStr;
    }), distinctUntilChanged())
  }

  ngOnInit() {
    this.searchStr$.pipe(takeUntil(this.complete$)).subscribe(searchStr => {
      this.searchStr = searchStr;
      this.queryFeeds();
    });
  }

  private setUrlListener() {
    this.urlFeedId$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('feedId')),
      takeUntil(this.complete$),
    );

    this.route.paramMap
      .pipe(
        takeUntil(this.complete$),
        map((params: ParamMap) => params.get('category')),
        distinctUntilChanged((a: string, b: string) => {
          return a === b;
        })
      )
      .subscribe((category: string) => {
        this.category = category;
        this.offset = 0;
        this.store.dispatch(new CleanFeeds());
        this.queryFeeds();
      });
  }

  public queryFeeds(): void {
    this.store.dispatch(
      new GetFeeds({ offset: this.offset, limit: this.pageLimit, category: this.category, search: this.searchStr })
    );
    this.offset += this.pageLimit;
  }

  public resetOffset(): void {
    this.offset = 0;
  }
}
