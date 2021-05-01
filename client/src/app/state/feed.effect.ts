import { Injectable } from '@angular/core';
import {act, Actions, Effect, ofType} from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap, mapTo, switchMap } from 'rxjs/operators';
import { FeedMarkService } from '../core/feed-mark.service';
import {
  ActionTypes,
  MarkFeedFavorite,
  MarkFeedFavoriteSuccess,
  RemoveFeedMark,
  RemoveFeedMarkSuccess,
  GetSources,
  GetSourcesSuccess,
  AddSources,
  AddSourcesSuccess,
  GetFeeds,
  GetFeedsSuccess,
  RemoveSource,
  RemoveSourceSuccess
} from './feed.actions';
import { Action } from '@ngrx/store';
import { FeedMark, FeedSource, Feed } from '../../typing/feed';
import { FeedSourceService } from '../core/feed-source.service';
import gql from 'graphql-tag';
import { ApolloQueryResult } from 'apollo-client';
import { Apollo } from 'apollo-angular';

@Injectable()
export class FeedEffects {
  constructor(
    private actions$: Actions,
    private feedMarkService: FeedMarkService,
    private feedSourceService: FeedSourceService,
    private apollo: Apollo
  ) {}

  @Effect()
  markFavorite$ = this.actions$.pipe(
    ofType(ActionTypes.MARK_FEED_FAVORITE),
    mergeMap((action: MarkFeedFavorite) =>
      this.feedMarkService.markFeedFavorite(action.payload.feedId).pipe(
        map(
          (feedMark: FeedMark) =>
            new MarkFeedFavoriteSuccess({ feedId: action.payload.feedId, feedMark })
        ),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  removeFeedMark$ = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_FEED_MARK),
    mergeMap((action: RemoveFeedMark) =>
      this.feedMarkService.removeFeedMark(action.payload.feedId, action.payload.markId).pipe(
        map(() => new RemoveFeedMarkSuccess({ feedId: action.payload.feedId })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  getFeedSource$ = this.actions$.pipe(
    ofType(ActionTypes.GET_SOURCES),
    mergeMap((action: GetSources) => {
      return this.feedSourceService.querySourceList().pipe(
        map((feedSources: FeedSource[]) => {
          return new GetSourcesSuccess({ sources: feedSources });
        })
      );
    })
  );

  @Effect()
  AddFeedSource$ = this.actions$.pipe(
    ofType(ActionTypes.ADD_SOURCE),
    mergeMap((action: AddSources) => {
      return this.feedSourceService.createFeedSource(action.payload.formData).pipe(
        tap((source: FeedSource) => {
          action.meta.resetFormFn();
        })
      );
    }),
    map(() => {
      return new AddSourcesSuccess();
    })
  );

  @Effect()
  removeFeedSource$ = this.actions$.pipe(
    ofType(ActionTypes.REMOVE_SOURCE),
    mergeMap((action: RemoveSource) => {
      return this.feedSourceService
        .removeFeedSource({ id: action.payload.id })
        .pipe(mapTo({ id: action.payload.id }));
    }),
    map(({ id }) => {
      return new RemoveSourceSuccess({ id });
    })
  );

  @Effect()
  AddFeedSourceSuccess$ = this.actions$.pipe(
    ofType(ActionTypes.ADD_SOURCE_SUCCESS),
    map(() => {
      return new GetSources();
    })
  );

  @Effect()
  getFeeds$ = this.actions$.pipe(
    ofType(ActionTypes.GET_FEEDS),
    switchMap((action: GetFeeds) => {
      return this.apollo.query({
        query: gql`
          query getFeeds($limit: Int!, $offset: Int!, $category: String!, $search: String!) {
            feeds(limit: $limit, offset: $offset, category: $category, search: $search) {
              id
              rssId
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
          limit: action.payload.limit,
          offset: action.payload.offset,
          category: action.payload.category,
          search: action.payload.search
        },
        fetchPolicy: 'network-only'
      });
    }),
    map(
      ({ data }: ApolloQueryResult<{ feeds: Feed[] }>) => new GetFeedsSuccess({ feeds: data.feeds })
    )
  );
}
