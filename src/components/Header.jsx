import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/theme/theme-context";

export default function Header() {
    const { dark, toggleTheme } = useTheme();

    return (
        <header className="flex justify-between items-center py-4 px-6 bg-blue-600 text-white">
            <h1 className="text-xl font-semibold">Mini Task Manager</h1>
            <nav className="flex gap-4">
                <Link to="/" className="hover:underline">Home</Link>
                <Link to="/about" className="hover:underline">About</Link>
            </nav>
            <button
                onClick={toggleTheme}
                className="bg-blue-800 px-3 py-1 rounded hover:bg-blue-700"
            >
                {dark ? "☀️" : "🌙"}
            </button>
        </header>
    );
}
