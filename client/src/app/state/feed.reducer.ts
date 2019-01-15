import { Action } from '@ngrx/store';
import { ActionTypes, AddFeeds } from './feed.actions';
import { Feed } from '../../typing/feed';

export const initialState = {
  feedMap: {},
  feedIds: []
};

export function feedReducer(state = initialState, action: AddFeeds) {
  switch (action.type) {
    case ActionTypes.ADD_FEEDS:
      const feeds: Feed[] = action.payload.feeds;
      const feedMap = feeds.reduce((result, feed) => {
        result[feed.id] = feed;
        return result;
      }, {});
      return {
        ...state,
        feedIds: state.feedIds.concat(feeds.map((feed: Feed) => feed.id)),
        feedMap: {
          ...state.feedMap,
          ...feedMap
        }
      };

    default:
      return state;
  }
}
