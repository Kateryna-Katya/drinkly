import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "modern-normalize";
import "./index.css";

import store, { persistor } from "./redux/store.js";

import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";

// import Modal from "react-modal";

// Modal.setAppElement("#root");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
