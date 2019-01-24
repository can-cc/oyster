import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { FeedMarkService } from '../core/feed-mark.service';
import {
  ActionTypes,
  MarkFeedFavorite,
  MarkFeedFavoriteSuccess,
  RemoveFeedMark,
  RemoveFeedMarkSuccess
} from './feed.actions';
import { Action } from '@ngrx/store';
import { FeedMark } from '../../typing/feed';

@Injectable()
export class FeedEffects {
  constructor(private actions$: Actions, private feedMarkService: FeedMarkService) {}

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
}
