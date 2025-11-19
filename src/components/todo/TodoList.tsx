import TodoItem from "./TodoItem";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, newText: string) => void;
    onReorder: (activeId: string, overId: string) => void;
}

function SortableTodoItem({ todo, onToggle, onDelete, onEdit }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: todo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <TodoItem
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
                dragHandleProps={{ ...attributes, ...listeners }}
            />
        </div>
    );
}

export default function TodoList({
    todos,
    onToggle,
    onDelete,
    onEdit,
    onReorder,
}: TodoListProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            onReorder(active.id as string, over.id as string);
        }
    };

    if (todos.length === 0)
        return <p className="text-center py-6 opacity-70">No tasks yet</p>;

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={todos.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="flex flex-col gap-2 mt-4">
                    {todos.map((t) => (
                        <SortableTodoItem
                            key={t.id}
                            todo={t}
                            onToggle={onToggle}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
