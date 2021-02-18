import {
  FETCH_PRODUCT_INFO_REQUEST,
  FETCH_PRODUCT_INFO_FAILURE,
  FETCH_PRODUCT_INFO_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  data: {},
  loading: false,
  error: null,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_INFO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCT_INFO_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case FETCH_PRODUCT_INFO_SUCCESS:
      const { data } = action.payload;
      return {
        ...state,
        data,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
