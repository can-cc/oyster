import { Action } from '@ngrx/store';
import { Feed, FeedMark } from '../../typing/feed';

export enum ActionTypes {
  ADD_FEEDS = '[Feed Component] Add Feeds',
  SET_SOURCES = '[Source Component] Set Sources',
  MARK_FEED_FAVORITE = '[Feed Component] Mark feed favorite',
  MARK_FEED_FAVORITE_SUCCESS = '[Feed Component] Mark feed favorite success',
  REMOVE_FEED_MARK = '[Feed Component] Remove feed mark',
  REMOVE_FEED_MARK_SUCCESS = '[Feed Component] Remove feed mark success',
  Reset = '[Counter Component] Reset'
}

export class SetSources implements Action {
  readonly type = ActionTypes.SET_SOURCES;
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
