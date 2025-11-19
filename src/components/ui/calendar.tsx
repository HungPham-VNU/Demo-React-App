import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  className?: string
  month?: Date
  onMonthChange?: (date: Date) => void
}

function Calendar({
  className,
  selected,
  onSelect,
  disabled,
  month: controlledMonth,
  onMonthChange,
  ...props
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(controlledMonth || new Date())
  
  const month = controlledMonth || currentMonth
  
  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth)
    onMonthChange?.(newMonth)
  }

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    month.getFullYear(),
    month.getMonth(),
    1
  ).getDay()

  const previousMonth = () => {
    handleMonthChange(new Date(month.getFullYear(), month.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    handleMonthChange(new Date(month.getFullYear(), month.getMonth() + 1, 1))
  }

  const days = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="p-2" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(month.getFullYear(), month.getMonth(), day)
    const isSelected =
      selected &&
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    const isToday =
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    const isDisabled = disabled?.(date)

    days.push(
      <button
        key={day}
        type="button"
        onClick={() => !isDisabled && onSelect?.(date)}
        disabled={isDisabled}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal",
          isSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
          isToday && !isSelected && "bg-accent",
          isDisabled && "text-muted-foreground opacity-50"
        )}
      >
        {day}
      </button>
    )
  }

  return (
    <div className={cn("p-3", className)} {...props}>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={previousMonth}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-7 w-7 p-0"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="text-sm font-medium">
          {month.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <button
          type="button"
          onClick={nextMonth}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "h-7 w-7 p-0"
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-muted-foreground font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  )
}

Calendar.displayName = "Calendar"

export { Calendar }
