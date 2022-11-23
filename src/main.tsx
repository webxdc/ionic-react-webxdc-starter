import { setupIonicReact } from "@ionic/react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { init } from "./store";

window.onload = () => {
  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // init ionic after loading
  const mode = localStorage.getItem("mode") || "auto"
  switch (mode) {
    case "md":
    case "ios":
      setupIonicReact({
        mode,
      });
      break;
    default:
      setupIonicReact();
      break;
  }
  init().then(() => {
    console.log("Loading done");
  });
}


