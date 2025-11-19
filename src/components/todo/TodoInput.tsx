import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { DatePicker } from "@/components/calendar/DatePicker";

interface TodoInputProps {
    onAdd: (text: string, dueDate?: string) => void;
    inputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function TodoInput({ onAdd, inputRef }: TodoInputProps) {
    const [text, setText] = useState("");
    const [dueDate, setDueDate] = useState<Date | undefined>();

    const handleSubmit = () => {
        if (!text.trim()) return;
        onAdd(text.trim(), dueDate?.toISOString());
        setText("");
        setDueDate(undefined);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <Input
                    ref={inputRef}
                    placeholder="Enter task... (Ctrl+N)"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                />
                <Button onClick={handleSubmit}>
                    <Plus className="size-4" />
                    Add
                </Button>
            </div>
            <DatePicker
                date={dueDate}
                onDateChange={setDueDate}
                placeholder="Add due date (optional)"
            />
        </div>
    );
}
