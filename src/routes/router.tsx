// src/routes/router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,     // Layout cha
        errorElement: <NotFound />,  // Trang lỗi chung
        children: [
            { index: true, element: <Home /> }, // Trang mặc định '/'
            { path: "about", element: <About /> },
        ],
    },
]);
