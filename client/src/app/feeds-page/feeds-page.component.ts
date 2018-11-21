import { Component, OnInit, ViewChild } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';

@Component({
  selector: 'app-feeds-page',
  templateUrl: './feeds-page.component.html',
  styleUrls: ['./feeds-page.component.css']
})
export class FeedsPageComponent implements OnInit {

  @ViewChild('list') list;
  feeds: Feed[] = [];
  selectedFeed: Feed;
  pageLimit = 20;
  offset = 0;

  constructor(private apollo: Apollo) {}

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
              link
              source
              content
              published
              isRead
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
          (this.feeds = this.feeds.concat(data.feeds))
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
