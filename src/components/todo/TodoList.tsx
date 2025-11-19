import TodoItem from "./TodoItem";

export default function TodoList({
    todos,
    onToggle,
    onDelete,
}: any) {
    if (todos.length === 0)
        return <p className="text-center py-6 opacity-70">No tasks yet</p>;

    return (
        <div className="flex flex-col gap-2 mt-4">
            {todos.map((t: any) => (
                <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
            ))}
        </div>
    );
}
