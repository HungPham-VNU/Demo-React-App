import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    dueDate?: string; // ISO 8601 format
    createdAt: string; // ISO 8601 format
}

export function useTodos() {
    const saved = useLocalStorage<Todo[]>("todos", []);
    const [todos, setTodos] = useState<Todo[]>(saved);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (text: string, dueDate?: string) =>
        setTodos([...todos, { 
            id: crypto.randomUUID(), 
            text, 
            completed: false, 
            dueDate,
            createdAt: new Date().toISOString()
        }]);

    const toggleTodo = (id: string) =>
        setTodos(
            todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );

    const deleteTodo = (id: string) =>
        setTodos(todos.filter((t) => t.id !== id));

    const editTodo = (id: string, newText: string, dueDate?: string) =>
        setTodos(
            todos.map((t) =>
                t.id === id ? { ...t, text: newText, dueDate } : t
            )
        );

    const reorderTodos = (activeId: string, overId: string) => {
        const oldIndex = todos.findIndex((t) => t.id === activeId);
        const newIndex = todos.findIndex((t) => t.id === overId);
        
        if (oldIndex === -1 || newIndex === -1) return;
        
        const newTodos = [...todos];
        const [movedItem] = newTodos.splice(oldIndex, 1);
        newTodos.splice(newIndex, 0, movedItem);
        setTodos(newTodos);
    };

    return { todos, addTodo, toggleTodo, deleteTodo, editTodo, reorderTodos };
}
