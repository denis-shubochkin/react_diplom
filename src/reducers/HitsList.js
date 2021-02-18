import {
  FETCH_HITS_REQUEST,
  FETCH_HITS_FAILURE,
  FETCH_HITS_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  hitsItems: [],
  hitsLoading: false,
  hitsError: null,
};

export default function hitsListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HITS_REQUEST:
      return {
        ...state,
        hitsLoading: true,
        hitsError: null,
      };
    case FETCH_HITS_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        hitsLoading: false,
        hitsError: error,
      };
    case FETCH_HITS_SUCCESS:
      const { hitsItems } = action.payload;
      return {
        ...state,
        hitsItems,
        hitsLoading: false,
        hitsError: null,
      };
    default:
      return state;
  }
}
