import { createStore } from "redux";
import rootReducer from "./rootReducer";

const composeEnhancers =
  typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

const store = createStore(rootReducer, {}, composeEnhancers);

export default store;
