import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';

const FeedSourcesQuery = gql`
  query getFeedSources {
    sources {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class FeedSourceService {

  constructor(
    private apollo: Apollo
  ) { }

  public getSourceList() {
    this.apollo
    .watchQuery({
      query: FeedSourcesQuery
    })
    .valueChanges.subscribe(
      ({ data }: ApolloQueryResult<{ feeds: Feed[] }>) => {
        // (this.feeds = this.feeds.concat(data.feeds))
    });
  }
}
