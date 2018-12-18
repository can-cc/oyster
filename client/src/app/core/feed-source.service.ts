import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo, QueryRef } from 'apollo-angular';
import { FeedSource, CreateFeedSourceInput } from '../../typing/feed';

const FeedSourcesQuery = gql`
  query getFeedSources {
    sources {
      id
      name
      url
    }
  }
`;

const FeedSourceCreateMutation = gql`
  mutation mutationFeedSource($name: String!, $url: String!) {
    source(name: $name, url: $url) {
      id
      name
      url
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class FeedSourceService {
  constructor(private apollo: Apollo) {}

  public getSourceList(): QueryRef<FeedSource[]> {
    return this.apollo.watchQuery({
      query: FeedSourcesQuery
    });
  }

  public createFeedSource({ name, url }: CreateFeedSourceInput) {
    return this.apollo.mutate({
      mutation: FeedSourceCreateMutation,
      variables: { name, url }
    });
  }
}
