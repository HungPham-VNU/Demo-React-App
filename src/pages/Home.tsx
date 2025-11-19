import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTodos } from "@/hooks/useTodos";
import { useState } from "react";

export default function Home() {
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

    const filteredTodos = todos.filter(todo => {
        if (filter === "pending") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true; // all
    });

    return (
        <div className="max-w-xl mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Todo List</h1>
            </div>

            <Tabs
                defaultValue="all"
                value={filter}
                onValueChange={(v) => setFilter(v as any)}
                className="w-full mb-4"
            >
                <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
            </Tabs>
            <TodoInput onAdd={addTodo} />

            <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
        </div>
    );
}
