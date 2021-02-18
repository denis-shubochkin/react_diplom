import {
  SEND_ORDER_FAILURE,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  sended: false,
  loading: false,
  error: null,
};

export default function sendOrderReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEND_ORDER_FAILURE:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case SEND_ORDER_SUCCESS:
      return {
        ...state,
        sended: true,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
}
