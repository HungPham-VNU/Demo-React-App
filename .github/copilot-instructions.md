# Copilot Instructions for Demo React App

## Architecture Overview

This is a React 19 + TypeScript + Vite todo application using modern patterns:

- **Stack**: React 19.2, TypeScript 5.9, Vite 7, TailwindCSS 4, React Router DOM 7
- **UI Components**: shadcn/ui (Radix UI primitives) in "new-york" style with `class-variance-authority`
- **State Management**: React hooks with localStorage persistence (no Redux/Zustand)
- **Routing**: React Router DOM with layout-based navigation (`MainLayout` → `Outlet`)

## Project Structure

```
src/
├── components/
│   ├── calendar/    # Calendar components (CalendarView, DatePicker)
│   ├── theme/       # Theme toggle component
│   ├── todo/        # Todo-specific components (TodoInput, TodoItem, TodoList)
│   └── ui/          # shadcn/ui components (button, card, checkbox, calendar, popover, etc.)
├── context/         # React Context providers (ThemeContext)
├── hooks/           # Custom hooks (useTodos, useLocalStorage, useDebounce, useKeyboardShortcuts)
├── layouts/         # Page layouts with Outlet (MainLayout)
├── pages/           # Route pages (Home, About)
├── router/          # Router configuration (createBrowserRouter)
└── lib/             # Utilities (cn helper for className merging)
```

## Key Conventions

### Import Aliases
Use `@/` for all imports: `import { Button } from "@/components/ui/button"`

### Component Patterns
- **UI Components**: Export named `Button` component AND `buttonVariants` from CVA
- **Custom Hooks**: Return object with destructurable methods (e.g., `{ todos, addTodo, toggleTodo, deleteTodo }`)
- **Context**: Export both context and provider (see `ThemeContext.tsx`)

### Styling Approach
- Use TailwindCSS utility classes exclusively
- Combine classes with `cn()` helper from `@/lib/utils`
- Dark mode via `dark:` prefix (class-based, toggled on `documentElement`)
- Example from `MainLayout.tsx`:
  ```tsx
  className={cn(
    buttonVariants({ variant: isActive ? "default" : "ghost", size: "sm" }),
    "px-4"
  )}
  ```

### State Management Pattern
1. **Theme**: Context API with localStorage sync (see `ThemeContext.tsx`)
2. **Todos**: Custom hook (`useTodos`) with localStorage persistence
3. **Local state**: `useState` for component-specific state (filters, inputs)

**Example from `useTodos.ts`:**
```typescript
const [todos, setTodos] = useState<Todo[]>(saved);
useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);
```

### Routing Structure
- Defined in `src/router/index.tsx` using `createBrowserRouter`
- Layout wrapper pattern: `MainLayout` with nested routes via `children` array
- Navigation uses `NavLink` with active state styling

## Development Workflow

### Commands
- **Dev server**: `npm run dev` or `pnpm dev` (Vite HMR on default port)
- **Build**: `npm run build` (TypeScript check + Vite build)
- **Lint**: `npm run lint` (ESLint with flat config)
- **Preview**: `npm run preview` (preview production build)

### Adding shadcn/ui Components
Follow configuration in `components.json`:
- Style: "new-york"
- Components go to `src/components/ui/`
- Uses `@/` aliases for imports
- Icon library: `lucide-react`

### ESLint Notes
- Uses flat config (`eslint.config.js`)
- `@typescript-eslint/no-explicit-any` is disabled project-wide
- React Hooks and React Refresh plugins enabled

## TypeScript Configuration
- Path alias `@/*` maps to `./src/*` (see `tsconfig.json`)
- Split configs: `tsconfig.app.json` (app code) + `tsconfig.node.json` (Vite config)

## Critical Patterns to Follow

1. **localStorage hooks pattern**: Use `useLocalStorage` for initial load, then `useEffect` for syncing changes

2. **Component composition**: Pages compose domain components (`TodoInput`, `TodoList`) rather than inline logic

3. **Router children pattern**: Use `index: true` for root route instead of `path: "/"`

4. **Ref forwarding**: Components accept optional refs for keyboard shortcut integration (see `TodoInput`)

## New Features Implemented

### Todo Editing
- **Double-click** any uncompleted todo text to enter edit mode
- **Enter** to save, **Escape** to cancel
- Edit icon appears on hover (hidden by default)
- Can edit both text and due date in edit mode
- See `TodoItem.tsx` for inline editing pattern with `useState` + `useRef`

### Search & Filtering
- Debounced search (300ms) using custom `useDebounce` hook
- Combines with status filter tabs (All/Pending/Completed)
- Search matches todo text case-insensitively
- Clear button appears when search is active

### Drag & Drop Reordering
- Uses `@dnd-kit` library (sortable + core + utilities)
- Wrap list with `<DndContext>` and `<SortableContext>`
- Each item uses `useSortable` hook for drag behavior
- Dedicated drag handle (grip icon) to avoid blocking other interactions
- See `TodoList.tsx` for `SortableTodoItem` wrapper pattern with `dragHandleProps`

### Keyboard Shortcuts
- **Ctrl+K**: Focus search input
- **Ctrl+N**: Focus new todo input
- **Ctrl+/**: Toggle dark/light theme
- **Escape**: Clear search and filters
- Custom `useKeyboardShortcuts` hook manages all shortcuts
- Shortcuts shown in UI as `<kbd>` elements

### Due Dates & Calendar
- **Due Date Picker**: Add optional due dates when creating/editing todos
- **Color-coded badges**: Overdue (red), Today (yellow), Tomorrow (blue), Upcoming (gray)
- **Calendar View**: Switch between List and Calendar views via tabs
- **Monthly Calendar Grid**: Shows dots on dates with todos
- **Click to filter**: Click any date to see todos for that day
- **Responsive**: Full calendar on desktop, compact on mobile with side panel
- Uses `date-fns` for all date formatting and calculations
- Date stored as ISO 8601 strings in localStorage
- See `CalendarView.tsx` for calendar grid implementation
- See `DatePicker.tsx` for reusable date picker component with Popover + Calendar

## External Dependencies
- **Radix UI**: Headless component primitives for Dialog, Checkbox, Tabs, Separator, Popover
- **Lucide React**: Icon library (prefer this over other icon sets) - icons: `Search`, `X`, `Pencil`, `Trash2`, `Check`, `GripVertical`, `Plus`, `Calendar`, `ChevronLeft`, `ChevronRight`
- **class-variance-authority**: For variant-based component APIs
- **tailwind-merge + clsx**: Combined in `cn()` utility for className handling
- **@dnd-kit**: Drag and drop library (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`)
- **date-fns**: Lightweight date utility library for formatting, parsing, and date calculations

## Monorepo Note
This app lives in a pnpm workspace (`pnpm-workspace.yaml` exists at root). The `web-truyen-thong/` folder is a separate vanilla JS project - ignore it unless specifically working on multi-project tasks.
