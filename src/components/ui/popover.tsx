import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end"
  sideOffset?: number
}

const PopoverContext = React.createContext<{
  open: boolean
  onOpenChange: (open: boolean) => void
} | null>(null)

const Popover = ({ open: controlledOpen, onOpenChange, children }: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const open = controlledOpen ?? uncontrolledOpen
  const handleOpenChange = onOpenChange ?? setUncontrolledOpen

  return (
    <PopoverContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, onClick, asChild, ...props }, ref) => {
  const context = React.useContext(PopoverContext)
  if (!context) throw new Error("PopoverTrigger must be used within Popover")

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    context.onOpenChange(!context.open)
    onClick?.(e)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as any, {
      onClick: handleClick,
    })
  }

  return (
    <button ref={ref} onClick={handleClick} className={className} {...props}>
      {children}
    </button>
  )
})
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, align = "center", sideOffset = 4, children, ...props }, ref) => {
    const context = React.useContext(PopoverContext)
    if (!context) throw new Error("PopoverContent must be used within Popover")

    if (!context.open) return null

    return (
      <>
        <div
          className="fixed inset-0 z-40"
          onClick={() => context.onOpenChange(false)}
        />
        <div
          ref={ref}
          className={cn(
            "fixed z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className
          )}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          {...props}
        >
          {children}
        </div>
      </>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

const PopoverAnchor = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => <div ref={ref} {...props} />)
PopoverAnchor.displayName = "PopoverAnchor"

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
