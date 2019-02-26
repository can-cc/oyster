import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { FeedSource, CreateFeedSourceInput } from '../../typing/feed';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { FetchResult } from 'apollo-link';
import { map, tap } from 'rxjs/operators';

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
    addSource(name: $name, url: $url) {
      id
      name
      url
    }
  }
`;

const FeedSourceRemoveMutation = gql`
  mutation mutationFeedSource($id: String!) {
    removeSource(id: $id) {
      result
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class FeedSourceService {
  constructor(private apollo: Apollo) {}

  public querySourceList(): Observable<FeedSource[]> {
    return this.apollo
      .query<{ sources: FeedSource[] }>({
        query: FeedSourcesQuery,
        fetchPolicy: 'no-cache'
      })
      .pipe(
        map(({ data }) => {
          return data.sources;
        })
      );
  }

  public createFeedSource({ name, url }: CreateFeedSourceInput): Observable<FeedSource> {
    return this.apollo
      .mutate({
        mutation: FeedSourceCreateMutation,
        variables: { name, url }
      })
      .pipe(map(({ data }: FetchResult<{ source: FeedSource }>) => data.source));
  }

  public removeFeedSource({ id }): Observable<string> {
    return this.apollo
      .mutate({
        mutation: FeedSourceRemoveMutation,
        variables: { id }
      })
      .pipe(map(({ data }: FetchResult<{ result: string }>) => data.result));
  }
}
