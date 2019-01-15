import { Action } from '@ngrx/store';
import { Feed } from '../../typing/feed';

export enum ActionTypes {
  ADD_FEEDS = '[Feed Component] Add Feeds',
  Decrement = '[Counter Component] Decrement',
  Reset = '[Counter Component] Reset'
}

export class AddFeeds implements Action {
  readonly type = ActionTypes.ADD_FEEDS;

  constructor(public payload: { feeds: Feed[] }) {}
}

export class Decrement implements Action {
  readonly type = ActionTypes.Decrement;
}

export class Reset implements Action {
  readonly type = ActionTypes.Reset;
}
