import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TodoInput({ onAdd }: { onAdd: (t: string) => void }) {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (!text.trim()) return;
        onAdd(text.trim());
        setText("");
    };

    return (
        <div className="flex gap-2">
            <Input
                placeholder="Enter task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={handleSubmit}>Add</Button>
        </div>
    );
}
