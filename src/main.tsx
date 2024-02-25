import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.tsx";
import "@/styles/tailwind.css";
import { Provider } from "react-redux";
import makeStore from "./store/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={makeStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
