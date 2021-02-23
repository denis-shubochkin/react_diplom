import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../actions/actionTypes";

const initialState = {
  items: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

export default function CartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
        const { data, counter, size } = action.payload;
        if(state.items.length>0)
        {
            let checkQtInd  = state.items.findIndex(el => el.id === data.sku + size);
            console.log(checkQtInd)
            if (checkQtInd!==-1) {
              state.items[checkQtInd].qt += counter; 
              console.log(state.items)
              localStorage.setItem('cartItems', JSON.stringify(state.items));
              return {
                items: state.items,
            };
            }
        }
        const itemToAdd = {
          id: data.sku + size,
          data: data,
          size: size,
          qt: counter,
        };
        let resultArr = [...state.items, itemToAdd];
        localStorage.setItem('cartItems', JSON.stringify(resultArr));
        return {
            items: [...state.items, itemToAdd],
        };
    case REMOVE_FROM_CART:
        const { item } = action.payload;
        let res = state.items.filter((o) => o.id !== item.id);
        localStorage.setItem('cartItems', JSON.stringify(res));
        return {
            items: res,
        };
    case CLEAR_CART:
        localStorage.clear();
            return {
              items: [],
            };
    default:
      return state;
  }
}
