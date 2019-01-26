import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
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
    AddSourcesSuccess
} from './feed.actions';
import { Action } from '@ngrx/store';
import { FeedMark, FeedSource } from '../../typing/feed';
import { FeedSourceService } from '../core/feed-source.service';

@Injectable()
export class FeedEffects {
    constructor(private actions$: Actions, private feedMarkService: FeedMarkService, private feedSourceService: FeedSourceService) { }

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
            return this.feedSourceService.querySourceList().pipe(map((feedSources: FeedSource[]) => {
                return new GetSourcesSuccess({ sources: feedSources });
            }))
        })
    );

    @Effect()
    AddFeedSource$ = this.actions$.pipe(
        ofType(ActionTypes.ADD_SOURCE),
        mergeMap((action: AddSources) => {
            return this.feedSourceService.createFeedSource(action.payload.formData).pipe(tap((source: FeedSource) => {
                action.meta.resetFormFn();
            }));
        }),
        map(() => {
            return new AddSourcesSuccess();
        })
    );

    @Effect()
    AddFeedSourceSuccess$ = this.actions$.pipe(
        ofType(ActionTypes.ADD_SOURCE_SUCCESS),
        map(() => {
            return new GetSources();
        })
    );
}
