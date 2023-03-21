import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/main.scss";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { persistore, store } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
