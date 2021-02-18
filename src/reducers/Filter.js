import { SET_FILTER } from "../actions/actionTypes";

const initialState = {
  globalFilter: "",
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      const { text } = action.payload;
      return {
        globalFilter: text,
      };
    default:
      return state;
  }
}
