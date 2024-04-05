import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./globals.css";
import { Toaster } from "./components/ui/sonner.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
