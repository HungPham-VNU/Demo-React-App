import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export function useTodos() {
    const saved = useLocalStorage<Todo[]>("todos", []);
    const [todos, setTodos] = useState<Todo[]>(saved);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string) =>
        setTodos([...todos, { id: crypto.randomUUID(), text, completed: false }]);

    const toggleTodo = (id: string) =>
        setTodos(
            todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );

    const deleteTodo = (id: string) =>
        setTodos(todos.filter((t) => t.id !== id));

    return { todos, addTodo, toggleTodo, deleteTodo };
}
