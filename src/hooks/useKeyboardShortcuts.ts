import { useEffect } from "react";

interface ShortcutConfig {
    key: string;
    ctrlKey?: boolean;
    shiftKey?: boolean;
    callback: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            shortcuts.forEach(({ key, ctrlKey, shiftKey, callback }) => {
                const keyMatch = event.key.toLowerCase() === key.toLowerCase();
                const ctrlMatch = ctrlKey === undefined || event.ctrlKey === ctrlKey;
                const shiftMatch = shiftKey === undefined || event.shiftKey === shiftKey;

                if (keyMatch && ctrlMatch && shiftMatch) {
                    event.preventDefault();
                    callback();
                }
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [shortcuts]);
}
