import {
  ActionTypes,
  CleanFeeds,
  CleanSearch,
  GetFeedsSuccess,
  GetSourcesSuccess,
  MarkFeedFavoriteSuccess,
  RemoveFeedMarkSuccess,
  SetSearchStr
} from './feed.actions';
import { Feed } from '../../typing/feed';

export const initialState = {
  feedMap: {},
  feedIds: [],
  feedSources: [],
  searchStr: ''
};

export function feedReducer(
  state = initialState,
  action:
    | MarkFeedFavoriteSuccess
    | RemoveFeedMarkSuccess
    | GetFeedsSuccess
    | GetSourcesSuccess
    | SetSearchStr
    | CleanFeeds
    | CleanSearch
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

    case ActionTypes.SET_SEARCH:
      return {
        ...state,
        searchStr: action.payload.searchStr
      };

    case ActionTypes.CLEAN_SEARCH:
      return {
        ...state,
        searchStr: ''
      };

    case ActionTypes.CLEAN_FEEDS:
      return {
        ...state,
        feedMap: {},
        feedIds: []
      };

    default:
      return state;
  }
}
