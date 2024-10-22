"use client";

import store from "@/app/redux/store";
import { Provider } from "react-redux";

export default function AccountLayout({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
