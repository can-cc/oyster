import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Store } from '@ngrx/store';  
import { ApolloQueryResult } from 'apollo-client';
import { Feed } from '../../typing/feed';
import { AddFeeds } from '../state/feed.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-feeds-page',
  templateUrl: './feeds-page.component.html',
  styleUrls: ['./feeds-page.component.css']
})
export class FeedsPageComponent implements OnInit {
  @ViewChild('list') list;
  selectedFeed: Feed;
  pageLimit = 20;
  offset = 0;

  feeds$: Observable<Feed[]>;

  constructor(private apollo: Apollo, private store: Store<{ feed: {
    feedMap: {[id: string]: Feed},
    feedIds: string[]
  } }>) {
    this.feeds$ = store.pipe(map(({feed}) => {
      return feed.feedIds.map(id => feed.feedMap[id]);
    }));
  }

  ngOnInit() {
    this.queryFeeds();
  }

  queryFeeds(): void {
    this.apollo
      .watchQuery({
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
      .valueChanges.subscribe(
        ({ data }: ApolloQueryResult<{ feeds: Feed[] }>) =>
          this.store.dispatch(new AddFeeds({feeds: data.feeds}))
          //(this.feeds = this.feeds.concat(data.feeds))
      );
    this.offset += this.pageLimit;
  }

  public resetOffset(): void {
    this.offset = 0;
  }

  public onFeedListSelect(feed: Feed) {
    this.selectedFeed = feed;
  }
}
