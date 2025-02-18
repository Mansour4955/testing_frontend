"use client";
import store from "@/redux/store";
import { Provider } from "react-redux";
import PlatformDisplayer from "./PlatformDisplayer";
import "@/helpers/i18n"
import { withTranslation } from "react-i18next";

function Main({ children }) {
  return (
    <div>
      <Provider store={store}>
        <PlatformDisplayer>{children}</PlatformDisplayer>
      </Provider>
    </div>
  );
}
export default withTranslation()(Main);
