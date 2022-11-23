import { setupIonicReact } from "@ionic/react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { init } from "./store";

window.onload = () => {
  // Add or remove the "dark" class based on if the media query matches
  function toggleDarkTheme(shouldAdd: boolean) {
    document.body.classList.toggle("dark", shouldAdd);
  }

  // Use matchMedia to check the user preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  toggleDarkTheme(prefersDark.matches);

  // Listen for changes to the prefers-color-scheme media query
  prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

  const container = document.getElementById("root");
  const root = createRoot(container!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // init ionic after loading
  const mode = localStorage.getItem("mode") || "auto";
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
};
