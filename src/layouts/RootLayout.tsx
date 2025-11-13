// src/layouts/RootLayout.jsx
import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <>
            <Header />
            <main className="p-6 max-w-2xl mx-auto">
                <Outlet /> {/* nơi render các trang con */}
            </main>
        </>
    );
}
