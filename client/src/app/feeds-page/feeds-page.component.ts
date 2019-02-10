import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Store } from '@ngrx/store';
import { ApolloQueryResult } from 'apollo-client';
import { Feed } from '../../typing/feed';
import { AddFeeds } from '../state/feed.actions';
import { Observable, Subject } from 'rxjs';
import { map, tap, take, takeUntil } from 'rxjs/operators';
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

  constructor(
    private apollo: Apollo,
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

  ngOnInit() {
    this.queryFeeds();
  }

  private setUrlListener() {
    this.urlFeedId$ = this.route.paramMap.pipe(
      takeUntil(this.complete$),
      map((params: ParamMap) => params.get('feedId'))
    );
  }

  public queryFeeds(): void {
    this.apollo
      .query({
        query: gql`
          query getFeeds($limit: Int!, $offset: Int) {
            feeds(limit: $limit, offset: $offset) {
              id
              title
              author
              originHref
              sourceId
              content
              createdAt
              updatedAt
              publishedDate
              source {
                id
                name
              }
              marks {
                id
                type
              }
            }
          }
        `,
        variables: {
          limit: this.pageLimit,
          offset: this.offset
        }
      })
      .subscribe(({ data }: ApolloQueryResult<{ feeds: Feed[] }>) =>
        this.store.dispatch(new AddFeeds({ feeds: data.feeds }))
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
