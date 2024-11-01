import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { KeycloakProvider } from "./state/KeycloakContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <KeycloakProvider>
      <App />
    </KeycloakProvider>
  </React.StrictMode>
);
