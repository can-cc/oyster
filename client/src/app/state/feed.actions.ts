import { Action } from '@ngrx/store';
import { Feed } from '../../typing/feed';

export enum ActionTypes {
  ADD_FEEDS = '[Feed Component] Add Feeds',
  SET_SOURCES = '[Source Component] Set Sources',
  Reset = '[Counter Component] Reset'
}

export class SetSources implements Action {
  readonly type = ActionTypes.SET_SOURCES;
}

export class AddFeeds implements Action {
  readonly type = ActionTypes.ADD_FEEDS;

  constructor(public payload: { feeds: Feed[] }) {}
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}
