import About from "@/pages/About";
import Home from "@/pages/Home";
import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },         // tương đương path="/"
            { path: "about", element: <About /> },       // path="/about"
        ],
    },
]);
