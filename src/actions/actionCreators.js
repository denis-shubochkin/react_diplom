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

export const fetchHits = async (dispatch) => {
  dispatch(fetchHitsRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_TOP_SALES}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchHitsSuccess(data));
  } catch (e) {
    dispatch(fetchHitsFailure(e.message));
  }
};

export const fetchProduct = async (dispatch, id) => {
  dispatch(fetchProductRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_ITEMS}/${id}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    dispatch(fetchProductSuccess(data));
  } catch (e) {
    dispatch(fetchProductFailure(e.message));
  }
};

export const fetchCatalog = async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_CATEG}`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();

    dispatch(fetchCategoriesSuccess(data));
  } catch (e) {
    dispatch(fetchCategoriesFailure(e.message));
  }
};

export const sendOrder = async (dispatch, order) => {
  dispatch(sendOrderRequest());
  try {
    const response = await fetch(`${process.env.REACT_APP_ORDER}`, {
      method: "POST",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    dispatch(sendOrderSuccess());
  } catch (e) {
    dispatch(sendOrderFailure(e.message));
  }
};

export const fetchCatItems = async (dispatch, id, offset, filter) => {
  dispatch(fetchCatItemsRequest());
  try {
    const catId = id !== 0 ? `?categoryId=${id}` : "";
    const offsetId = offset ? `offset=${offset}` : "";
    let result = catId === "" ? `?${offsetId}` : `${catId}&${offsetId}`;
    if (filter) {
      if (id !== 0 || offset) {
        result = `${result}&q=${filter}`;
      } else {
        result = `?q=${filter}`;
      }
    }

    const response = await fetch(
      `${process.env.REACT_APP_ITEMS}${id || offset || filter ? result : ""}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
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

// import {
//   CHANGE_SERVICE_FIELD,
//   FETCH_SERVICES_REQUEST,
//   FETCH_SERVICES_FAILURE,
//   FETCH_SERVICES_SUCCESS,
//   ADD_SERVICE_REQUEST,
//   ADD_SERVICE_FAILURE,
//   ADD_SERVICE_SUCCESS,
//   REMOVE_SERVICE,
//   EDIT_SERVICE,
//   CLEAR_SERVICE,
//   REMOVE_SERVICE_REQUEST,
//   REMOVE_SERVICE_FAILURE,
//   REMOVE_SERVICE_SUCCESS
// } from './actionTypes';

// export const fetchServicesRequest = () => ({
//   type: FETCH_SERVICES_REQUEST,
// });

// export const fetchServicesFailure = error => ({
//   type: FETCH_SERVICES_FAILURE,
//   payload: {
//     error,
//   },
// });

// export const fetchServicesSuccess = items => ({
//   type: FETCH_SERVICES_SUCCESS,
//   payload: {
//     items,
//   },
// });

// export const addServiceRequest = (name, price, desc) => ({
//   type: ADD_SERVICE_REQUEST,
//   payload: {
//     name,
//     price,
//     desc
//   },
// })

// export const addServiceFailure = error => ({
//   type: ADD_SERVICE_FAILURE,
//   payload: {
//     error,
//   },
// });

// export const addServiceSuccess = () => ({
//   type: ADD_SERVICE_SUCCESS,
// });

// export const removeServiceRequest = (id) => ({
//   type: REMOVE_SERVICE_REQUEST,
//   payload: {
//     id
//   },
// })

// export const removeServiceFailure = error => ({
//   type: REMOVE_SERVICE_FAILURE,
//   payload: {
//     error,
//   },
// });

// export const removeServiceSuccess = () => ({
//   type: REMOVE_SERVICE_SUCCESS,
// });

// export const changeServiceField = (name, value) => ({
//   type: CHANGE_SERVICE_FIELD,
//   payload: {
//     name,
//     value
//   },
// });

// export const removeService = id => ({
//   type: REMOVE_SERVICE,
//   payload: {
//     id,
//   },
// });

// export function clearService() {
//   return {type: CLEAR_SERVICE};
// }

// export function editService(n, price, desc) {
//   return {type: EDIT_SERVICE, payload: {n, price, desc}};
// }

// export const fetchServices = async dispatch => {
//   dispatch(fetchServicesRequest());
//   try {
//     console.log(process.env.REACT_APP_API_URL)
//     const response = await fetch(`${process.env.REACT_APP_API_URL}`)
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     const data = await response.json();
//     console.log(data);
//     dispatch(fetchServicesSuccess(data));
//   } catch (e) {
//     dispatch(fetchServicesFailure(e.message));
//   }
// }

// export const addService = async (dispatch, name, price, desc) => {
//   dispatch(addServiceRequest());
//   try {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ name, price, desc }),
//     })
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     dispatch(addServiceSuccess());
//   } catch (e) {
//     dispatch(addServiceFailure(e.message));
//   }
//   fetchServices(dispatch);
// }

// export const delService = async (dispatch, id) => {
//   dispatch(removeServiceRequest());
//   try {
//     const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },

//     })
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     dispatch(removeServiceSuccess());
//   } catch (e) {
//     dispatch(removeServiceFailure(e.message));
//   }
//   fetchServices(dispatch);
// }
