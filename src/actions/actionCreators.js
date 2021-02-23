import { fetchCatalogApi, fetchCatItemsApi, fetchHitsApi , fetchProductApi, sendOrderApi } from "../utils/api";
import {
  FETCH_HITS_REQUEST,
  FETCH_HITS_FAILURE,
  FETCH_HITS_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_FAILURE,
  CHANGE_ACTIVE_CAT,
  FETCH_CAT_ITEMS_FAILURE,
  FETCH_CAT_ITEMS_REQUEST,
  FETCH_CAT_ITEMS_SUCCESS,
  FETCH_MORE_CAT_ITEMS_REQUEST,
  SET_FILTER,
  FETCH_PRODUCT_INFO_FAILURE,
  FETCH_PRODUCT_INFO_REQUEST,
  FETCH_PRODUCT_INFO_SUCCESS,
  SEND_ORDER_FAILURE,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART
} from "./actionTypes";

export const fetchHitsRequest = () => ({
  type: FETCH_HITS_REQUEST,
});

export const fetchHitsFailure = (error) => ({
  type: FETCH_HITS_FAILURE,
  payload: {
    error,
  },
});

export const fetchHitsSuccess = (hitsItems) => ({
  type: FETCH_HITS_SUCCESS,
  payload: {
    hitsItems,
  },
});

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: {
    error,
  },
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: {
    categories,
  },
});

export const changeActiveCat = (id) => ({
  type: CHANGE_ACTIVE_CAT,
  payload: { id },
});

export const fetchCatItemsRequest = () => ({
  type: FETCH_CAT_ITEMS_REQUEST,
});

export const fetchMoreCatItems = (moreCatItems, loadButStatus) => ({
  type: FETCH_MORE_CAT_ITEMS_REQUEST,
  payload: {
    moreCatItems,
    loadButStatus,
  },
});

export const fetchCatItemsFailure = (error) => ({
  type: FETCH_CAT_ITEMS_FAILURE,
  payload: {
    error,
  },
});

export const fetchCatItemsSuccess = (catItems) => ({
  type: FETCH_CAT_ITEMS_SUCCESS,
  payload: {
    catItems,
  },
});

export const setGlobalFilter = (text) => ({
  type: SET_FILTER,
  payload: { text },
});

export const fetchProductRequest = () => ({
  type: FETCH_PRODUCT_INFO_REQUEST,
});

export const fetchProductFailure = (error) => ({
  type: FETCH_PRODUCT_INFO_FAILURE,
  payload: {
    error,
  },
});

export const fetchProductSuccess = (data) => ({
  type: FETCH_PRODUCT_INFO_SUCCESS,
  payload: {
    data,
  },
});

export const sendOrderRequest = () => ({
  type: SEND_ORDER_REQUEST,
});

export const sendOrderFailure = (error) => ({
  type: SEND_ORDER_FAILURE,
  payload: {
    error,
  },
});

export const sendOrderSuccess = () => ({
  type: SEND_ORDER_SUCCESS,
});

export const addToCart = (data, counter, size) => ({
  type: ADD_TO_CART,
  payload: {
    data,
    counter, 
    size
  },
})

export const removeFromCart = (item) => ({
  type: REMOVE_FROM_CART,
  payload: {
    item,
  },
})

export const clearCart = () => ({
  type: CLEAR_CART,
})

export const fetchHits = async (dispatch) => {
  dispatch(fetchHitsRequest());
  try {
    const data = await fetchHitsApi();
    dispatch(fetchHitsSuccess(data));
  } catch (e) {
    dispatch(fetchHitsFailure(e.message));
  }
};

export const fetchProduct = async (dispatch, id) => {
  dispatch(fetchProductRequest());
  try {
    const data = await fetchProductApi(id);
    dispatch(fetchProductSuccess(data));
  } catch (e) {
    dispatch(fetchProductFailure(e.message));
  }
};

export const fetchCatalog = async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const data = await fetchCatalogApi();
    dispatch(fetchCategoriesSuccess(data));
  } catch (e) {
    dispatch(fetchCategoriesFailure(e.message));
  }
};

export const sendOrder = async (dispatch, order) => {
  dispatch(sendOrderRequest());
  try {
    await sendOrderApi(order);
    dispatch(sendOrderSuccess());
  } catch (e) {
    dispatch(sendOrderFailure(e.message));
  }
};

export const fetchCatItems = async (dispatch, id, offset, filter) => {
  dispatch(fetchCatItemsRequest());
  try {
    const data = await fetchCatItemsApi(id,offset,filter);
    if (offset) {
      if (data.length < 6) dispatch(fetchMoreCatItems(data, false));
      else {
        dispatch(fetchMoreCatItems(data, true));
      }
    } else {
      dispatch(fetchCatItemsSuccess(data));
    }
  } catch (e) {
    dispatch(fetchCatItemsFailure(e.message));
  }
};
