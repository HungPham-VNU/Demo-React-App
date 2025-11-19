
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/useTheme";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { dark, setDark } = useTheme();

    return (
        <Button variant="outline" size="icon" onClick={() => setDark(!dark)}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
    );
}
