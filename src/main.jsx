if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("✅ PWA Ready"))
      .catch((err) => console.log("❌ SW Error", err))
  })
}

import React from "react";
import ReactDOM from "react-dom/client"
import App from "./App";
import "./index.css"


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
