import {
  FETCH_CAT_ITEMS_REQUEST,
  FETCH_CAT_ITEMS_FAILURE,
  FETCH_CAT_ITEMS_SUCCESS,
  FETCH_MORE_CAT_ITEMS_REQUEST,
} from "../actions/actionTypes";

const initialState = {
  catItems: [],
  loadButStatus: false,
  catItemsLoading: false,
  catItemsError: null,
};

export default function catItemsListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CAT_ITEMS_REQUEST:
      return {
        ...state,
        catItemsLoading: true,
        catItemsError: null,
      };
    case FETCH_CAT_ITEMS_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        catItemsLoading: false,
        catItemsError: error,
      };
    case FETCH_CAT_ITEMS_SUCCESS:
      const { catItems } = action.payload;
      return {
        ...state,
        catItems,
        catItemsLoading: false,
        catItemsError: null,
        loadButStatus: true,
      };
    case FETCH_MORE_CAT_ITEMS_REQUEST:
      const { moreCatItems, loadButStatus } = action.payload;
      if (loadButStatus) {
        return {
          ...state,
          catItems: [...state.catItems.concat(moreCatItems)],
          loadButStatus: true,
          catItemsLoading: false,
          catItemsError: null,
        };
      } else {
        return {
          ...state,
          loadButStatus: false,
          catItemsLoading: false,
          catItemsError: null,
        };
      }

    default:
      return state;
  }
}
