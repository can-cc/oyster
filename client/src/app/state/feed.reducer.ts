import {
  ActionTypes,
  AddFeeds,
  MarkFeedFavoriteSuccess,
  RemoveFeedMarkSuccess,
  GetSourcesSuccess,
  GetFeedsSuccess
} from './feed.actions';
import { Feed } from '../../typing/feed';

export const initialState = {
  feedMap: {},
  feedIds: [],
  feedSources: []
};

export function feedReducer(
  state = initialState,
  action:
    | AddFeeds
    | MarkFeedFavoriteSuccess
    | RemoveFeedMarkSuccess
    | GetFeedsSuccess
    | GetSourcesSuccess
) {
  switch (action.type) {
    case ActionTypes.GET_SOURCES_SUCCESS:
      return {
        ...state,
        feedSources: (<GetSourcesSuccess>action).payload.sources
      };

    case ActionTypes.GET_FEEDS_SUCCESS:
      const feeds: Feed[] = (<GetFeedsSuccess>action).payload.feeds;
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

    case ActionTypes.MARK_FEED_FAVORITE_SUCCESS:
      return {
        ...state,
        feedMap: {
          ...state.feedMap,
          [action.payload.feedId]: {
            ...state.feedMap[action.payload.feedId],
            marks: [action.payload.feedMark]
          }
        }
      };

    case ActionTypes.REMOVE_FEED_MARK_SUCCESS:
      return {
        ...state,
        feedMap: {
          ...state.feedMap,
          [action.payload.feedId]: {
            ...state.feedMap[action.payload.feedId],
            marks: []
          }
        }
      };

    default:
      return state;
  }
}
