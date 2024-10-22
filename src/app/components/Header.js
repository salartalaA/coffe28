"use client";

import InteractiveHeader from "./InteractiveHeader";
import { Provider } from "react-redux";
import store from "../redux/store";

export default function Header() {
  return (
    <Provider store={store}>
      <InteractiveHeader />
    </Provider>
  );
}
