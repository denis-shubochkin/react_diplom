import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  CHANGE_ACTIVE_CAT,
} from "../actions/actionTypes";

const initialState = {
  categories: [],
  active: null,
  catLoading: false,
  catError: null,
};

export default function catListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        catLoading: true,
        catError: null,
      };
    case FETCH_CATEGORIES_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        catLoading: false,
        catError: error,
      };
    case FETCH_CATEGORIES_SUCCESS:
      const { categories } = action.payload;
      return {
        ...state,
        categories,
        active: 0,
        catLoading: false,
        catError: null,
      };
    case CHANGE_ACTIVE_CAT:
      const { id } = action.payload;
      return {
        ...state,
        active: id,
      };
    default:
      return state;
  }
}
