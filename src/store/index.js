import {createStore, combineReducers} from "redux";
import catItemsListReducer from "../reducers/CatItemsList.js";
import catListReducer from "../reducers/CatList.js";
import hitsListReducer from "../reducers/HitsList.js";
import filterReducer from "../reducers/Filter.js";
import productReducer from "../reducers/Product.js";
import sendOrderReducer from "../reducers/SendOrder.js";

const reducer = combineReducers({
  hitsList: hitsListReducer,
  catList: catListReducer,
  catItemsList: catItemsListReducer,
  filter: filterReducer,
  product: productReducer,
  sendOrder: sendOrderReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
