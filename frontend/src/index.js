import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Compressor from "./components/Compressor";
import Resizer from "./components/Resizer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/resize" element={<Resizer />} />
        <Route path="/compress" element={<Compressor />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
