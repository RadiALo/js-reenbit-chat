import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NotificationList from "./components/NotificationsList";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NotificationList>
      <App />
    </NotificationList>
  </React.StrictMode>
);

reportWebVitals();
