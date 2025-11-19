import ThemeToggle from "@/components/theme/ThemeToggle";
import { Outlet, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navbar */}
            <header className="border-b bg-card/40 backdrop-blur supports-[backdrop-filter]:bg-card/40">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <h1 className="text-xl font-bold tracking-tight">TODO-APP</h1>

                    {/* Menu */}
                    <nav className="flex items-center gap-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                cn(
                                    buttonVariants({
                                        variant: isActive ? "default" : "ghost",
                                        size: "sm",
                                    }),
                                    "px-4"
                                )
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                cn(
                                    buttonVariants({
                                        variant: isActive ? "default" : "ghost",
                                        size: "sm",
                                    }),
                                    "px-4"
                                )
                            }
                        >
                            About
                        </NavLink>
                    </nav>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8 max-w-3xl">
                <Outlet />
            </main>
        </div>
    );
}
