import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT,
  INCREMENT,
  REMOVE_FROM_CART,
} from "./actionType";

const isBrowser = typeof window !== "undefined";

const UpdateLocalStorage = (cart) => {
  if (isBrowser && window.localStorage) {
    localStorage.setItem("shopping-cart", JSON.stringify(cart));
  }
};

const initialState = {
  cart:
    isBrowser && window.localStorage && localStorage.getItem("shopping-cart")
      ? JSON.parse(localStorage.getItem("shopping-cart"))
      : [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const hasProduct = state.cart.find((p) => p.id === action.payload.id);
      const updatedCart = hasProduct
        ? state.cart.map((p) =>
            p.id === action.payload.id
              ? { ...p, qty: p.qty + 1, weight: p.weight }
              : p
          )
        : [
            ...state.cart,
            { ...action.payload, qty: 1, weight: action.payload.weight },
          ];
      UpdateLocalStorage(updatedCart);
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case INCREMENT: {
      const updatedCart = state.cart.map((p) =>
        p.id === action.payload ? { ...p, qty: p.qty + 1 } : p
      );
      UpdateLocalStorage(updatedCart);
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case DECREMENT: {
      const product = state.cart.find((p) => p.id === action.payload);
      const updatedCart =
        product.qty > 1
          ? state.cart.map((p) =>
              p.id === action.payload ? { ...p, qty: p.qty - 1 } : p
            )
          : state.cart;
      UpdateLocalStorage(updatedCart);
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter((p) => p.id !== action.payload);
      UpdateLocalStorage(updatedCart);
      return {
        ...state,
        cart: updatedCart,
      };
    }

    case CLEAR_CART: {
      UpdateLocalStorage([]);
      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
