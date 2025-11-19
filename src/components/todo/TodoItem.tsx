import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, Check, X, GripVertical } from "lucide-react";
import { format, isPast, isToday, isTomorrow, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/calendar/DatePicker";

interface TodoItemProps {
    todo: { id: string; text: string; completed: boolean; dueDate?: string };
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string, dueDate?: string) => void;
    dragHandleProps?: any;
}

export default function TodoItem({
    todo,
    onToggle,
    onDelete,
    onEdit,
    dragHandleProps,
}: TodoItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editDueDate, setEditDueDate] = useState<Date | undefined>(
        todo.dueDate ? parseISO(todo.dueDate) : undefined
    );
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (editText.trim()) {
            onEdit(todo.id, editText.trim(), editDueDate?.toISOString());
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setEditText(todo.text);
        setEditDueDate(todo.dueDate ? parseISO(todo.dueDate) : undefined);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSave();
        } else if (e.key === "Escape") {
            handleCancel();
        }
    };

    const getDueDateBadge = () => {
        if (!todo.dueDate) return null;
        
        const dueDate = parseISO(todo.dueDate);
        const isOverdue = isPast(dueDate) && !isToday(dueDate) && !todo.completed;
        const isDueToday = isToday(dueDate);
        const isDueTomorrow = isTomorrow(dueDate);

        let badgeText = format(dueDate, "MMM d");
        let badgeClass = "bg-muted text-muted-foreground";

        if (isOverdue) {
            badgeText = "Overdue";
            badgeClass = "bg-destructive/10 text-destructive border-destructive/20";
        } else if (isDueToday) {
            badgeText = "Today";
            badgeClass = "bg-yellow-500/10 text-yellow-700 dark:text-yellow-500 border-yellow-500/20";
        } else if (isDueTomorrow) {
            badgeText = "Tomorrow";
            badgeClass = "bg-blue-500/10 text-blue-700 dark:text-blue-500 border-blue-500/20";
        }

        return (
            <span className={cn("text-xs px-2 py-0.5 rounded-full border", badgeClass)}>
                {badgeText}
            </span>
        );
    };

    return (
        <div className="flex justify-between items-center p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors group">
            <div className="flex items-center gap-3 flex-1">
                {dragHandleProps && (
                    <button
                        {...dragHandleProps}
                        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Drag to reorder"
                    >
                        <GripVertical className="size-4" />
                    </button>
                )}
                <Checkbox 
                    checked={todo.completed} 
                    onCheckedChange={() => onToggle(todo.id)}
                    disabled={isEditing}
                />
                {isEditing ? (
                    <div className="flex-1 space-y-2">
                        <Input
                            ref={inputRef}
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full"
                        />
                        <DatePicker
                            date={editDueDate}
                            onDateChange={setEditDueDate}
                            placeholder="Add due date"
                        />
                    </div>
                ) : (
                    <div className="flex-1 flex items-center gap-2">
                        <span 
                            className={`cursor-pointer ${todo.completed ? "line-through opacity-70" : ""}`}
                            onDoubleClick={() => !todo.completed && setIsEditing(true)}
                            title="Double-click to edit"
                        >
                            {todo.text}
                        </span>
                        {getDueDateBadge()}
                    </div>
                )}
            </div>
            <div className="flex items-center gap-1">
                {isEditing ? (
                    <>
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-700"
                        >
                            <Check className="size-4" />
                        </Button>
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={handleCancel}
                            className="text-muted-foreground"
                        >
                            <X className="size-4" />
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => setIsEditing(true)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={todo.completed}
                        >
                            <Pencil className="size-4" />
                        </Button>
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => onDelete(todo.id)}
                            className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
