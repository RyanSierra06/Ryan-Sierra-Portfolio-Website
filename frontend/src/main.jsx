import { HeroUIProvider, ToastProvider } from "@heroui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import NotFound from "./components/NotFound.jsx";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HeroUIProvider>
            <ToastProvider />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </HeroUIProvider>
    </React.StrictMode>
);
