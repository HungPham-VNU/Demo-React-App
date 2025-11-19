import { Checkbox } from "@/components/ui/checkbox";

export default function TodoItem({
    todo,
    onToggle,
    onDelete,
}: any) {
    return (
        <div className="flex justify-between items-center p-2 border rounded-lg">
            <div className="flex items-center gap-2">
                <Checkbox checked={todo.completed} onCheckedChange={() => onToggle(todo.id)} />
                <span className={todo.completed ? "line-through opacity-70" : ""}>
                    {todo.text}
                </span>
            </div>
            <button onClick={() => onDelete(todo.id)} className="text-red-500 text-sm">
                Delete
            </button>
        </div>
    );
}
