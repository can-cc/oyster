import { Action } from '@ngrx/store';
import { Feed, FeedMark, FeedSource } from '../../typing/feed';

export enum ActionTypes {
  ADD_SOURCE = '[Feed Component] Add feed source',
  ADD_SOURCE_SUCCESS = '[Feed Component] Add feed source success',
  ADD_FEEDS = '[Feed Component] Add feed',
  GET_SOURCES = '[Source Component] Get sources',
  GET_SOURCES_SUCCESS = '[Source Component] Get sources success',
  MARK_FEED_FAVORITE = '[Feed Component] Mark feed favorite',
  MARK_FEED_FAVORITE_SUCCESS = '[Feed Component] Mark feed favorite success',
  REMOVE_FEED_MARK = '[Feed Component] Remove feed mark',
  REMOVE_FEED_MARK_SUCCESS = '[Feed Component] Remove feed mark success',
  Reset = '[Counter Component] Reset'
}

export class GetSources implements Action {
  readonly type = ActionTypes.GET_SOURCES;
}

export class GetSourcesSuccess implements Action {
  readonly type = ActionTypes.GET_SOURCES_SUCCESS;

  constructor(public payload: { sources: FeedSource[] }) {}
}

export class AddSources implements Action {
  readonly type = ActionTypes.ADD_SOURCE;

  constructor(
    public payload: { formData: { name: string; url: string } },
    public meta: { resetFormFn: () => void }
  ) {}
}

export class AddSourcesSuccess implements Action {
  readonly type = ActionTypes.ADD_SOURCE_SUCCESS;
}

export class AddFeeds implements Action {
  readonly type = ActionTypes.ADD_FEEDS;

  constructor(public payload: { feeds: Feed[] }) {}
}

export class MarkFeedFavorite implements Action {
  readonly type = ActionTypes.MARK_FEED_FAVORITE;

  constructor(public payload: { feedId: string }) {}
}

export class MarkFeedFavoriteSuccess implements Action {
  readonly type = ActionTypes.MARK_FEED_FAVORITE_SUCCESS;

  constructor(public payload: { feedId: string; feedMark: FeedMark }) {}
}

export class RemoveFeedMark implements Action {
  readonly type = ActionTypes.REMOVE_FEED_MARK;

  constructor(public payload: { feedId: string; markId: string }) {}
}

export class RemoveFeedMarkSuccess implements Action {
  readonly type = ActionTypes.REMOVE_FEED_MARK_SUCCESS;

  constructor(public payload: { feedId: string }) {}
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}
