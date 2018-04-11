import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  feeds: Feed[] = [];
  selectedFeed: Feed;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          query getFeeds($limit: Int!, $offset: Int) {
            feeds(limit: $limit, offset: $offset) {
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
          limit: 20
        }
      })
      .valueChanges.subscribe(
        ({ data }: ApolloQueryResult<{ feeds: Feed[] }>) => (this.feeds = data.feeds)
      );
  }

  onFeedListSelect(feed: Feed) {
    this.selectedFeed = feed;
  }
}
