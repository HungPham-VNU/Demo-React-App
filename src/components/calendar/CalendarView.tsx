import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Todo } from "@/hooks/useTodos";
import TodoItem from "../todo/TodoItem";

interface CalendarViewProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string, dueDate?: string) => void;
}

export default function CalendarView({ todos, onToggle, onDelete, onEdit }: CalendarViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const firstDayOfWeek = monthStart.getDay();
    const emptyDays = Array(firstDayOfWeek).fill(null);

    const previousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const getTodosForDate = (date: Date) => {
        return todos.filter(todo => {
            if (!todo.dueDate) return false;
            const todoDate = parseISO(todo.dueDate);
            return isSameDay(todoDate, date);
        });
    };

    const selectedDateTodos = selectedDate ? getTodosForDate(selectedDate) : [];

    return (
        <div className="space-y-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    {format(currentMonth, "MMMM yyyy")}
                </h2>
                <div className="flex gap-1">
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={previousMonth}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setCurrentMonth(new Date());
                            setSelectedDate(new Date());
                        }}
                    >
                        Today
                    </Button>
                    <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={nextMonth}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Responsive Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar Grid */}
                <div className="lg:col-span-2">
                    <div className="border rounded-lg p-4">
                        {/* Day labels */}
                        <div className="grid grid-cols-7 gap-2 mb-2">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar days */}
                        <div className="grid grid-cols-7 gap-2">
                            {emptyDays.map((_, index) => (
                                <div key={`empty-${index}`} className="aspect-square" />
                            ))}
                            {daysInMonth.map((day) => {
                                const dayTodos = getTodosForDate(day);
                                const isSelected = selectedDate && isSameDay(day, selectedDate);
                                const isCurrentDay = isToday(day);

                                return (
                                    <button
                                        key={day.toISOString()}
                                        onClick={() => setSelectedDate(day)}
                                        className={cn(
                                            "aspect-square p-2 rounded-lg border transition-colors relative",
                                            "hover:bg-accent hover:border-accent-foreground/20",
                                            isSelected && "bg-primary text-primary-foreground border-primary",
                                            isCurrentDay && !isSelected && "border-primary border-2",
                                            !isSameMonth(day, currentMonth) && "text-muted-foreground"
                                        )}
                                    >
                                        <div className="text-sm font-medium">{format(day, "d")}</div>
                                        {dayTodos.length > 0 && (
                                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                                                {dayTodos.slice(0, 3).map((_, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={cn(
                                                            "w-1 h-1 rounded-full",
                                                            isSelected ? "bg-primary-foreground" : "bg-primary"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Selected Date Todos */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <h3 className="text-sm font-semibold mb-3">
                            {selectedDate
                                ? format(selectedDate, "EEEE, MMMM d")
                                : "Select a date"}
                        </h3>
                        {selectedDate && (
                            <div className="space-y-2">
                                {selectedDateTodos.length === 0 ? (
                                    <p className="text-sm text-muted-foreground py-6 text-center">
                                        No tasks for this day
                                    </p>
                                ) : (
                                    selectedDateTodos.map((todo) => (
                                        <div key={todo.id} className="overflow-hidden">
                                            <TodoItem
                                                todo={todo}
                                                onToggle={onToggle}
                                                onDelete={onDelete}
                                                onEdit={onEdit}
                                                dragHandleProps={undefined}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
