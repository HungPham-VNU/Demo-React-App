import React from "react";
import { useState, useEffect } from "react";
import { ThemeContext } from "./theme-context";

export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    const toggleTheme = () => setDark(!dark);

    return (
        <ThemeContext.Provider value={{ dark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
