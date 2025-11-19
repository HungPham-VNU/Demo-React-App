import TodoInput from "@/components/todo/TodoInput";
import TodoList from "@/components/todo/TodoList";
import CalendarView from "@/components/calendar/CalendarView";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTodos } from "@/hooks/useTodos";
import { useDebounce } from "@/hooks/useDebounce";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { useTheme } from "@/context/useTheme";

export default function Home() {
    const { todos, addTodo, toggleTodo, deleteTodo, editTodo, reorderTodos } = useTodos();
    const { setDark } = useTheme();
    const [view, setView] = useState<"list" | "calendar">("list");
    const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 300);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const todoInputRef = useRef<HTMLInputElement>(null);

    // Keyboard shortcuts
    useKeyboardShortcuts([
        {
            key: "k",
            ctrlKey: true,
            callback: () => searchInputRef.current?.focus(),
        },
        {
            key: "n",
            ctrlKey: true,
            callback: () => todoInputRef.current?.focus(),
        },
        {
            key: "/",
            ctrlKey: true,
            callback: () => setDark((prev) => !prev),
        },
        {
            key: "Escape",
            callback: () => {
                setSearchQuery("");
                setFilter("all");
            },
        },
    ]);

    const filteredTodos = todos.filter(todo => {
        // Apply status filter
        if (filter === "pending" && todo.completed) return false;
        if (filter === "completed" && !todo.completed) return false;
        
        // Apply search filter
        if (debouncedSearch) {
            return todo.text.toLowerCase().includes(debouncedSearch.toLowerCase());
        }
        
        return true;
    });

    const stats = {
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        pending: todos.filter(t => !t.completed).length,
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold">Todo List</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        {stats.completed} of {stats.total} completed
                    </p>
                </div>
                <div className="text-xs text-muted-foreground space-y-1 text-right">
                    <div><kbd className="px-1.5 py-0.5 rounded bg-muted">Ctrl+K</kbd> Search</div>
                    <div><kbd className="px-1.5 py-0.5 rounded bg-muted">Ctrl+N</kbd> New Todo</div>
                    <div><kbd className="px-1.5 py-0.5 rounded bg-muted">Ctrl+/</kbd> Theme</div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                    ref={searchInputRef}
                    placeholder="Search todos... (Ctrl+K)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9"
                />
                {searchQuery && (
                    <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                    >
                        <X className="size-4" />
                    </Button>
                )}
            </div>

            {/* View Tabs */}
            <Tabs
                value={view}
                onValueChange={(v) => setView(v as "list" | "calendar")}
                className="w-full mb-4"
            >
                <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>

                {/* List View Content */}
                <TabsContent value="list" className="mt-4 space-y-4">
                    {/* Filter Tabs */}
                    <Tabs
                        value={filter}
                        onValueChange={(v) => setFilter(v as any)}
                        className="w-full"
                    >
                        <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="all">
                                All {stats.total > 0 && `(${stats.total})`}
                            </TabsTrigger>
                            <TabsTrigger value="pending">
                                Pending {stats.pending > 0 && `(${stats.pending})`}
                            </TabsTrigger>
                            <TabsTrigger value="completed">
                                Completed {stats.completed > 0 && `(${stats.completed})`}
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <TodoInput onAdd={addTodo} inputRef={todoInputRef} />

                    {debouncedSearch && filteredTodos.length === 0 ? (
                        <p className="text-center py-6 opacity-70">
                            No todos match "{debouncedSearch}"
                        </p>
                    ) : (
                        <TodoList
                            todos={filteredTodos}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onEdit={editTodo}
                            onReorder={reorderTodos}
                        />
                    )}
                </TabsContent>

                {/* Calendar View Content */}
                <TabsContent value="calendar" className="mt-4">
                    <CalendarView
                        todos={todos}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onEdit={editTodo}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
